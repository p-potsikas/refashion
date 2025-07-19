// packages/framework/src/utils/cast.ts

export function castRegistrationType(
  value: any
): "individual" | "business" | null | undefined {
  return value === "individual" || value === "business" ? value : null;
}
