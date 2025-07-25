const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse arguments: --module <module_name> <col:type> <col:type>
const args = process.argv.slice(2);
const moduleIndex = args.indexOf('--module');

if (moduleIndex === -1 || !args[moduleIndex + 1]) {
  console.error('❌ Usage: node make-migration.js --module <module_name> <col:type> <col:type> ...');
  process.exit(1);
}

const moduleName = args[moduleIndex + 1];
const columns = args.slice(moduleIndex + 2); // Only columns now

// Define paths
const rootDir = path.join(__dirname, '..', '..'); // project root
const backendDir = path.join(rootDir, 'apps', 'backend');
const moduleDir = path.join(rootDir, 'packages', 'modules', moduleName);
const migrationsDir = path.join(moduleDir, 'src', 'migrations');

if (!fs.existsSync(moduleDir)) {
  console.error(`❌ Module '${moduleName}' does not exist at ${moduleDir}`);
  process.exit(1);
}

if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

// Generate timestamp
const timestamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, '')
  .slice(0, 14);

// Create migration filename
const fileName = `Migration${timestamp}.ts`;
const filePath = path.join(migrationsDir, fileName);

// Generate SQL
let upSql = '';
let downSql = '';

if (columns.length > 0) {
  const colDefs = columns.map(c => {
    const [name, type] = c.split(':');
    return `add column if not exists "${name}" ${type} null`;
  }).join(',\n      ');

  const dropDefs = columns.map(c => {
    const [name] = c.split(':');
    return `drop column if exists "${name}"`;
  }).join(',\n      ');

  upSql = `this.addSql(\`
      alter table if exists "seller"
      ${colDefs};
    \`);`;

  downSql = `this.addSql(\`
      alter table if exists "seller"
      ${dropDefs};
    \`);`;
}

// Migration template
const template = `import { Migration } from '@mikro-orm/migrations';

export class Migration${timestamp} extends Migration {
  async up(): Promise<void> {
    ${upSql || '// TODO: Add SQL statements here'}
  }

  async down(): Promise<void> {
    ${downSql || '// TODO: Add rollback SQL here'}
  }
}
`;

// Write migration file
fs.writeFileSync(filePath, template);
console.log(`✅ Migration created: packages/modules/${moduleName}/src/migrations/${fileName}`);

// Build the module and run migrations
try {
  console.log(`🔨 Building module '${moduleName}'...`);
  execSync('npm run build', { cwd: moduleDir, stdio: 'inherit' });
  console.log('✅ Build completed!');

  console.log(`🚀 Running all migrations with Medusa...`);
  execSync(`yarn medusa db:migrate`, { cwd: backendDir, stdio: 'inherit' });
  console.log(`✅ All migrations applied!`);
} catch (err) {
  console.error('❌ Error during build or migration:', err.message);
  process.exit(1);
}
