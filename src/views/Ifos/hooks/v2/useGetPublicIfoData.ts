import BigNumber from 'bignumber.js'
import { useState, useCallback } from 'react'
import { TELOS_BLOCK_TIME } from 'config'
import ifoV2Abi from 'config/abi/ifoV2.json'
import ifoV3Abi from 'config/abi/ifoV3.json'
import tokens from 'config/constants/tokens'
import { Ifo, IfoStatus } from 'config/constants/types'
import { FixedNumber } from '@ethersproject/bignumber'

import { useLpTokenPrice, usePriceCakeBusd } from 'state/farms/hooks'
import { BIG_ZERO } from 'utils/bigNumber'
import { multicallv2 } from 'utils/multicall'
import { PublicIfoData } from '../../types'
import { getStatus } from '../helpers'

// https://github.com/pancakeswap/pancake-contracts/blob/master/projects/ifo/contracts/IFOV2.sol#L431
// 1,000,000,000 / 100
const TAX_PRECISION = FixedNumber.from(10000000000)

const formatPool = (pool) => ({
  raisingAmountPool: pool ? new BigNumber(pool[0].toString()) : BIG_ZERO,
  offeringAmountPool: pool ? new BigNumber(pool[1].toString()) : BIG_ZERO,
  limitPerUserInLP: pool ? new BigNumber(pool[2].toString()) : BIG_ZERO,
  hasTax: pool ? pool[3] : false,
  totalAmountPool: pool ? new BigNumber(pool[4].toString()) : BIG_ZERO,
  sumTaxesOverflow: pool ? new BigNumber(pool[5].toString()) : BIG_ZERO,
})

/**
 * Gets all public data of an IFO
 */
const useGetPublicIfoData = (ifo: Ifo): PublicIfoData => {
  const { address, releaseBlockNumber, version } = ifo
  const cakePriceUsd = usePriceCakeBusd()
  const lpTokenPriceInUsd = useLpTokenPrice(ifo.currency.symbol)
  const currencyPriceInUSD = ifo.currency === tokens.cake ? cakePriceUsd : lpTokenPriceInUsd

  const [state, setState] = useState({
    isInitialized: false,
    status: 'idle' as IfoStatus,
    blocksRemaining: 0,
    secondsUntilStart: 0,
    progress: 5,
    secondsUntilEnd: 0,
    poolBasic: {
      raisingAmountPool: BIG_ZERO,
      offeringAmountPool: BIG_ZERO,
      limitPerUserInLP: BIG_ZERO,
      taxRate: 0,
      totalAmountPool: BIG_ZERO,
      sumTaxesOverflow: BIG_ZERO,
      pointThreshold: 0,
      admissionProfile: undefined,
    },
    poolUnlimited: {
      raisingAmountPool: BIG_ZERO,
      offeringAmountPool: BIG_ZERO,
      limitPerUserInLP: BIG_ZERO,
      taxRate: 0,
      totalAmountPool: BIG_ZERO,
      sumTaxesOverflow: BIG_ZERO,
    },
    thresholdPoints: undefined,
    startBlockNum: 0,
    endBlockNum: 0,
    numberPoints: 0,
  })

  const abi = version === 3.1 ? ifoV3Abi : ifoV2Abi

  const fetchIfoData = useCallback(
    async (currentBlock: number) => {
      const [
        startBlock,
        endBlock,
        poolBasic,
        poolUnlimited,
        taxRate,
        numberPoints,
        thresholdPoints,
        admissionProfile,
        pointThreshold,
      ] = await multicallv2(
        abi,
        [
          {
            address,
            name: 'startTimestamp',
          },
          {
            address,
            name: 'endBlock',
          },
          {
            address,
            name: 'viewPoolInformation',
            params: [0],
          },
          {
            address,
            name: 'viewPoolInformation',
            params: [1],
          },
          {
            address,
            name: 'viewPoolTaxRateOverflow',
            params: [1],
          },
          {
            address,
            name: 'numberPoints',
          },
          {
            address,
            name: 'thresholdPoints',
          },
          version === 3.1 && {
            address,
            name: 'admissionProfile',
          },
          version === 3.1 && {
            address,
            name: 'pointThreshold',
          },
        ].filter(Boolean),
      )

      const poolBasicFormatted = formatPool(poolBasic)
      const poolUnlimitedFormatted = formatPool(poolUnlimited)

      const startBlockNum = startBlock ? startBlock[0].toNumber() : 0
      const endBlockNum = endBlock ? endBlock[0].toNumber() : 0
      const taxRateNum = taxRate ? FixedNumber.from(taxRate[0]).divUnsafe(TAX_PRECISION).toUnsafeFloat() : 0

      const status = getStatus(currentBlock, startBlockNum, endBlockNum)
      const totalBlocks = endBlockNum - startBlockNum
      const blocksRemaining = endBlockNum - currentBlock

      // Calculate the total progress until finished or until start
      const progress =
        currentBlock > startBlockNum
          ? ((currentBlock - startBlockNum) / totalBlocks) * 100
          : ((currentBlock - releaseBlockNumber) / (startBlockNum - releaseBlockNumber)) * 100

      setState((prev) => ({
        ...prev,
        isInitialized: true,
        secondsUntilEnd: blocksRemaining * TELOS_BLOCK_TIME,
        secondsUntilStart: (startBlockNum - currentBlock) * TELOS_BLOCK_TIME,
        poolBasic: {
          ...poolBasicFormatted,
          taxRate: 0,
          pointThreshold: pointThreshold ? pointThreshold[0].toNumber() : 0,
          admissionProfile: admissionProfile ? admissionProfile[0] : undefined,
        },
        poolUnlimited: { ...poolUnlimitedFormatted, taxRate: taxRateNum },
        status,
        progress,
        blocksRemaining,
        startBlockNum,
        endBlockNum,
        thresholdPoints: thresholdPoints && thresholdPoints[0],
        numberPoints: numberPoints ? numberPoints[0].toNumber() : 0,
      }))
    },
    [releaseBlockNumber, address, version, abi],
  )

  return { ...state, currencyPriceInUSD, fetchIfoData }
}

export default useGetPublicIfoData
