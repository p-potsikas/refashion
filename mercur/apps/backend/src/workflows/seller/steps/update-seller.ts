import { castRegistrationType } from '@mercurjs/framework/src/utils/cast'

import { toHandle } from '@medusajs/framework/utils'
import { Modules } from '@medusajs/framework/utils'
import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk'

import { SellerDTO, SellerEvents, UpdateSellerDTO } from '@mercurjs/framework'
import { SELLER_MODULE, SellerModuleService } from '@mercurjs/seller'

export const updateSellerStep = createStep(
  'update-seller',
  async (input: UpdateSellerDTO, { container }) => {
    const service = container.resolve<SellerModuleService>(SELLER_MODULE)
    const eventBus = container.resolve(Modules.EVENT_BUS)

    const [previousData] = await service.listSellers({
      id: input.id
    })

    const newHandle = input.name ? toHandle(input.name) : undefined

    const rawSeller = await service.updateSellers({
      ...input,
      ...(newHandle ? { handle: newHandle } : {})
    })

    const updatedSellers: SellerDTO = {
      ...rawSeller,
      registration_type: castRegistrationType(rawSeller.registration_type),
    }


    if (input.store_status) {
      await eventBus.emit({
        name: SellerEvents.STORE_STATUS_CHANGED,
        data: {
          id: input.id,
          store_status: input.store_status
        }
      })
    }

    return new StepResponse(updatedSellers, previousData as UpdateSellerDTO)
  },
  async (previousData: UpdateSellerDTO, { container }) => {
    const service = container.resolve<SellerModuleService>(SELLER_MODULE)

    await service.updateSellers(previousData)
  }
)
