import { castRegistrationType } from '@mercurjs/framework/src/utils/cast'

import { toHandle } from '@medusajs/framework/utils'
import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk'

import { CreateSellerDTO, SellerDTO } from '@mercurjs/framework'
import { SELLER_MODULE, SellerModuleService } from '@mercurjs/seller'

export const createSellerStep = createStep(
  'create-seller',
  async (input: CreateSellerDTO, { container }) => {
    const service = container.resolve<SellerModuleService>(SELLER_MODULE)

    const rawSeller = await service.createSellers({
      ...input,
      handle: toHandle(input.name)
    })

    const seller: SellerDTO = {
      ...rawSeller,
      registration_type: castRegistrationType(rawSeller.registration_type),
    }


    return new StepResponse(seller, seller.id)
  },
  async (id: string, { container }) => {
    if (!id) {
      return
    }

    const service = container.resolve<SellerModuleService>(SELLER_MODULE)

    await service.deleteSellers([id])
  }
)
