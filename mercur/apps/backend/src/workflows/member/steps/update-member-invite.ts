import { castRegistrationType } from '@mercurjs/framework/src/utils/cast'

import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk'

import { MemberInviteDTO, UpdateMemberInviteDTO } from '@mercurjs/framework'
import { SELLER_MODULE, SellerModuleService } from '@mercurjs/seller'

export const updateMemberInviteStep = createStep(
  'update-member-invite',
  async (input: UpdateMemberInviteDTO, { container }) => {
    const service = container.resolve<SellerModuleService>(SELLER_MODULE)

    const rawPrevious = await service.retrieveMemberInvite(input.id)

    const previousData: MemberInviteDTO = {
      ...rawPrevious,
      seller: {
        ...rawPrevious.seller,
        registration_type: castRegistrationType(rawPrevious.seller?.registration_type),
      },
    }

    const updatedRaw =
      //@ts-ignore
      await service.updateMemberInvites(input)

    const updatedInvites: MemberInviteDTO = {
      ...updatedRaw,
      seller: {
        ...updatedRaw.seller,
        registration_type: castRegistrationType(updatedRaw.seller?.registration_type),
      },
    }


    return new StepResponse(updatedInvites, previousData)
  },
  async (previousData: MemberInviteDTO, { container }) => {
    const service = container.resolve<SellerModuleService>(SELLER_MODULE)
    //@ts-ignore
    await service.updateMemberInvites(previousData)
  }
)
