import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import { SerializedFarm } from 'state/types'
import tokens from 'config/constants/tokens'

const getFarmFromTokenSymbol = (
  farms: SerializedFarm[],
  tokenSymbol: string,
  preferredQuoteTokens?: string[],
): SerializedFarm => {
  const farmsWithTokenSymbol = farms.filter((farm) => farm.token.symbol === tokenSymbol)
  const filteredFarm = filterFarmsByQuoteToken(farmsWithTokenSymbol, preferredQuoteTokens)
  return filteredFarm
}

const getFarmBaseTokenPrice = (
  farm: SerializedFarm,
  quoteTokenFarm: SerializedFarm,
  tlosPriceUsdt: BigNumber,
): BigNumber => {
  const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote)

  if (farm.quoteToken.symbol === tokens.usdt.symbol) {
    return hasTokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (farm.quoteToken.symbol === tokens.wtlos.symbol) {
    return hasTokenPriceVsQuote ? tlosPriceUsdt.times(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  // We can only calculate profits without a quoteTokenFarm for BUSD/TLOS farms
  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  // Possible alternative farm quoteTokens:
  // UST (i.e. MIR-UST), pBTC (i.e. PNT-pBTC), BTCB (i.e. bBADGER-BTCB), ETH (i.e. SUSHI-ETH)
  // If the farm's quote token isn't BUSD or WVLX, we then use the quote token, of the original farm's quote token
  // i.e. for farm PNT - pBTC we use the pBTC farm's quote token - TLOS, (pBTC - TLOS)
  // from the TLOS - pBTC price, we can calculate the PNT - BUSD price
  if (quoteTokenFarm.quoteToken.symbol === tokens.wtlos.symbol) {
    const quoteTokenInUsdt = tlosPriceUsdt.times(quoteTokenFarm.tokenPriceVsQuote)
    return hasTokenPriceVsQuote && quoteTokenInUsdt
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInUsdt)
      : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === tokens.usdt.symbol) {
    const quoteTokenInUsdt = quoteTokenFarm.tokenPriceVsQuote
    return hasTokenPriceVsQuote && quoteTokenInUsdt
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInUsdt)
      : BIG_ZERO
  }

  // Catch in case token does not have immediate or once-removed BUSD/WVLX quoteToken
  return BIG_ZERO
}

const getFarmQuoteTokenPrice = (
  farm: SerializedFarm,
  quoteTokenFarm: SerializedFarm,
  tlosPriceUsdt: BigNumber,
): BigNumber => {
  if (farm.quoteToken.symbol === 'USDT') {
    return BIG_ONE
  }

  if (farm.quoteToken.symbol === 'WTLOS') {
    return tlosPriceUsdt
  }

  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'WTLOS') {
    return quoteTokenFarm.tokenPriceVsQuote ? tlosPriceUsdt.times(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'USDT') {
    return quoteTokenFarm.tokenPriceVsQuote ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  return BIG_ZERO
}

const getFarmsPrices = (farms: SerializedFarm[]) => {
  const tlosUsdtFarm = farms.find((farm) => farm.token.symbol === 'USDT' && farm.quoteToken.symbol === 'WTLOS')
  const tlosPriceUsdt = tlosUsdtFarm.tokenPriceVsQuote ? BIG_ONE.div(tlosUsdtFarm.tokenPriceVsQuote) : BIG_ZERO
  const farmsWithPrices = farms.map((farm) => {
    const quoteTokenFarm = getFarmFromTokenSymbol(farms, farm.quoteToken.symbol)
    const tokenPriceBusd = getFarmBaseTokenPrice(farm, quoteTokenFarm, tlosPriceUsdt)
    const quoteTokenPriceBusd = getFarmQuoteTokenPrice(farm, quoteTokenFarm, tlosPriceUsdt)

    return {
      ...farm,
      tokenPriceBusd: tokenPriceBusd.toJSON(),
      quoteTokenPriceBusd: quoteTokenPriceBusd.toJSON(),
    }
  })

  return farmsWithPrices
}

export default getFarmsPrices
