import { useCallback } from 'react'
import { LemonSqueezy } from '@lemonsqueezy/lemonsqueezy.js'

const STORE_ID = import.meta.env.VITE_LEMON_SQUEEZY_STORE_ID

interface CheckoutOptions {
  productId: string
  variantId?: string
  customData?: Record<string, any>
}

export function useLemonSqueezy() {
  const checkout = useCallback(async ({ productId, variantId, customData }: CheckoutOptions) => {
    try {
      const lemonSqueezy = new LemonSqueezy({
        storeId: STORE_ID,
        apiKey: import.meta.env.VITE_LEMON_SQUEEZY_API_KEY
      })

      const checkoutOptions = {
        storeId: STORE_ID,
        productId,
        ...(variantId && { variantId }),
        ...(customData && { customData }),
        checkoutOptions: {
          dark: true,
          media: false
        }
      }

      const { url } = await lemonSqueezy.createCheckout(checkoutOptions)
      window.location.href = url
    } catch (error) {
      console.error('Lemon Squeezy checkout error:', error)
      throw error
    }
  }, [])

  return { checkout }
}