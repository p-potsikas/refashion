import { castRegistrationType } from '@mercurjs/framework/src/utils/cast'

import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk'

import { MemberDTO, UpdateMemberDTO } from '@mercurjs/framework'
import { SELLER_MODULE, SellerModuleService } from '@mercurjs/seller'

export const updateMemberStep = createStep(
  'update-member',
  async (input: UpdateMemberDTO, { container }) => {
    const service = container.resolve<SellerModuleService>(SELLER_MODULE)

    const previousData = await service.retrieveMember(input.id)

    const updatedRaw = await service.updateMembers(input)

    const updatedMember: MemberDTO = {
      ...updatedRaw,
      seller: {
        ...updatedRaw.seller,
        registration_type: castRegistrationType(updatedRaw.seller?.registration_type),
      },
    }

    return new StepResponse(updatedMember, previousData as UpdateMemberDTO)
  },
  async (previousData: UpdateMemberDTO, { container }) => {
    const service = container.resolve<SellerModuleService>(SELLER_MODULE)

    await service.updateMembers(previousData)
  }
)
