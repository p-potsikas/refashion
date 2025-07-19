import { castRegistrationType } from '@mercurjs/framework/src/utils/cast'


import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk'

import { CreateMemberDTO, MemberDTO } from '@mercurjs/framework'
import { SELLER_MODULE } from '@mercurjs/seller'
import { SellerModuleService } from '@mercurjs/seller'

export const createMemberStep = createStep(
  'create-member',
  async (input: CreateMemberDTO, { container }) => {
    const service = container.resolve<SellerModuleService>(SELLER_MODULE)

    const memberRaw = await service.createMembers(input)

    const member: MemberDTO = {
      ...memberRaw,
      seller: {
        ...memberRaw.seller,
        registration_type: castRegistrationType(memberRaw.seller?.registration_type),
      },
    }

    return new StepResponse(member, member.id)
  },
  async (memberId: string, { container }) => {
    const service = container.resolve<SellerModuleService>(SELLER_MODULE)

    await service.deleteMembers([memberId])
  }
)
