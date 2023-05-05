import { Currency, currencyEquals, JSBI, Price } from '@wagyu-swap/sdk'
import tokens from 'config/constants/tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'
import { multiplyPriceByAmount } from 'utils/prices'
import { wrappedCurrency } from '../utils/wrappedCurrency'
import { PairState, usePairs } from './usePairs'

const { wtlos: WTLOS, usdt } = tokens

/**
 * Returns the price in BUSD of the input currency
 * @param currency currency to compute the BUSD price of
 */
export default function useBUSDPrice(currency?: Currency): Price | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = wrappedCurrency(currency, chainId)
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [chainId && wrapped && currencyEquals(WTLOS, wrapped) ? undefined : currency, chainId ? WTLOS : undefined],
      [wrapped?.equals(usdt) ? undefined : wrapped, usdt],
      [chainId ? WTLOS : undefined, usdt],
    ],
    [chainId, currency, wrapped],
  )
  const [[bnbPairState, bnbPair], [busdPairState, busdPair], [busdBnbPairState, busdBnbPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle wtlos/tlos
    if (wrapped.equals(WTLOS)) {
      if (busdPair) {
        const price = busdPair.priceOf(WTLOS)
        return new Price(currency, usdt, price.denominator, price.numerator)
      }
      return undefined
    }
    // handle usdt
    if (wrapped.equals(usdt)) {
      return new Price(usdt, usdt, '1', '1')
    }

    const bnbPairBNBAmount = bnbPair?.reserveOf(WTLOS)
    // TODO: CHANGE
    const bnbPairBNBBUSDValue: JSBI = JSBI.BigInt(0)
    // bnbPairBNBAmount && busdBnbPair ? busdBnbPair.priceOf(WTLOS).quote(bnbPairBNBAmount).raw : JSBI.BigInt(0)

    // all other tokens
    // first try the usdt pair
    if (busdPairState === PairState.EXISTS && busdPair && busdPair.reserveOf(usdt).greaterThan(bnbPairBNBBUSDValue)) {
      const price = busdPair.priceOf(wrapped)
      return new Price(currency, usdt, price.denominator, price.numerator)
    }
    if (bnbPairState === PairState.EXISTS && bnbPair && busdBnbPairState === PairState.EXISTS && busdBnbPair) {
      if (busdBnbPair.reserveOf(usdt).greaterThan('0') && bnbPair.reserveOf(WTLOS).greaterThan('0')) {
        const bnbBusdPrice = busdBnbPair.priceOf(usdt)
        const currencyBnbPrice = bnbPair.priceOf(WTLOS)
        const busdPrice = bnbBusdPrice.multiply(currencyBnbPrice).invert()
        return new Price(currency, usdt, busdPrice.denominator, busdPrice.numerator)
      }
    }

    return undefined
  }, [chainId, currency, bnbPair, bnbPairState, busdBnbPair, busdBnbPairState, busdPair, busdPairState, wrapped])
}

export const useCakeBusdPrice = (): Price | undefined => {
  const cakeBusdPrice = useBUSDPrice(tokens.cake)
  return cakeBusdPrice
}

export const useBUSDCurrencyAmount = (currency: Currency, amount: number): number | undefined => {
  const { chainId } = useActiveWeb3React()
  const busdPrice = useBUSDPrice(currency)
  const wrapped = wrappedCurrency(currency, chainId)
  if (busdPrice) {
    return multiplyPriceByAmount(busdPrice, amount, wrapped.decimals)
  }
  return undefined
}

export const useBUSDCakeAmount = (amount: number): number | undefined => {
  const cakeBusdPrice = useCakeBusdPrice()
  if (cakeBusdPrice) {
    return multiplyPriceByAmount(cakeBusdPrice, amount)
  }
  return undefined
}

export const useBNBBusdPrice = (): Price | undefined => {
  const bnbBusdPrice = useBUSDPrice(tokens.wtlos)
  return bnbBusdPrice
}
