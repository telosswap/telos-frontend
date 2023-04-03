import { BigNumber } from '@ethersproject/bignumber'
import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { ChainId } from '@wagyu-swap/sdk'
import { CHAIN_ID } from './networks'
import tokens, { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'
const chainId = parseInt(CHAIN_ID, 10)
const { MAINNET } = ChainId

const serializedTokens = serializeTokens()

export const MAX_LOCK_DURATION = 31536000
export const UNLOCK_FREE_DURATION = 604800
export const ONE_WEEK_DEFAULT = 604800
export const BOOST_WEIGHT = BigNumber.from('10000000000000')
export const DURATION_FACTOR = BigNumber.from('31536000')

export const vaultPoolConfig = {
  [VaultKey.CakeVaultV1]: {
    name: <Trans>Auto WAG</Trans>,
    description: <Trans>Automatic restaking</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 1000000,
    tokenImage: {
      primarySrc: `/images/toggle/wagyu.png`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeVault]: {
    name: <Trans>Stake WAG</Trans>,
    description: <Trans>Stake, Earn – And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 1000000,
    tokenImage: {
      primarySrc: `/images/toggle/wagyu.png`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
} as const

const pools: SerializedPoolConfig[] =
  chainId === MAINNET
    ? [
        {
          sousId: 0,
          stakingToken: serializedTokens.cake,
          earningToken: serializedTokens.cake,
          contractAddress: {
            41: '',
            40: '0xafEEf07A24Bfe445eBBd3e82642D6ae979B0D87A',
          },
          poolCategory: PoolCategory.CORE,
          harvest: true,
          tokenPerBlock: '0.75',
          sortOrder: 1,
          isFinished: false,
        },
      ]
    : [
        {
          sousId: 0,
          stakingToken: serializedTokens.cake,
          earningToken: serializedTokens.cake,
          contractAddress: {
            41: '0x04a5A39140B962f1275C6a032cFff9230cbF9521',
            40: '',
          },
          poolCategory: PoolCategory.CORE,
          harvest: true,
          tokenPerBlock: '1.3',
          sortOrder: 1,
          isFinished: false,
        },
        {
          sousId: 1,
          stakingToken: serializedTokens.te6,
          earningToken: serializedTokens.cake,
          contractAddress: {
            41: '0x8CD2A43E80f3009F6b846099e287A5A94628265d',
            40: '',
          },
          poolCategory: PoolCategory.CORE,
          harvest: true,
          tokenPerBlock: '1',
          sortOrder: 1,
          isFinished: true,
        },
        {
          sousId: 2,
          stakingToken: serializedTokens.te9,
          earningToken: serializedTokens.cake,
          contractAddress: {
            41: '0xEB8bdC742b1958e5cfC7885c3704881Cbc7C20B5',
            40: '',
          },
          poolCategory: PoolCategory.CORE,
          harvest: true,
          tokenPerBlock: '1',
          sortOrder: 1,
          isFinished: true,
        },
        {
          sousId: 3,
          stakingToken: serializedTokens.te12,
          earningToken: serializedTokens.cake,
          contractAddress: {
            41: '0xcbd2Da83e68c2B11ffa97Af0a08C1ed1BBcE0d08',
            40: '',
          },
          poolCategory: PoolCategory.CORE,
          harvest: true,
          tokenPerBlock: '1',
          sortOrder: 1,
          isFinished: true,
        },
        {
          sousId: 4,
          stakingToken: serializedTokens.te18,
          earningToken: serializedTokens.cake,
          contractAddress: {
            41: '0x8b6DCcB72A47177EAA8BF4ccee358f56c13eda1C',
            40: '',
          },
          poolCategory: PoolCategory.CORE,
          harvest: true,
          tokenPerBlock: '1',
          sortOrder: 1,
          isFinished: true,
        },
      ]
export default pools
