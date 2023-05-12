import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'
import { CHAIN_ID } from './networks'
import { ChainId } from '@wagyu-swap/sdk'

const serializedTokens = serializeTokens()

const chainId = parseInt(CHAIN_ID, 10)
const { MAINNET } = ChainId

export const VLX_WAG_FARM_PID = chainId === MAINNET ? 2 : 5 // WAG-TLOS (2)
export const VLX_USDT_FARM_PID = chainId === MAINNET ? 1 : 6 // USDT-TLOS (3)

const farms: SerializedFarmConfig[] =
  chainId === MAINNET
    ? [
        {
          pid: 0,
          lpSymbol: 'WAG',
          lpAddresses: {
            41: '',
            40: '0x0CcD27B7581b2961c370A1Ed756c4d99eb755FCb',
          },
          token: serializedTokens.syrup,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 1,
          lpSymbol: 'TLOS_USDT LP',
          lpAddresses: {
            41: '',
            40: '0xc63720522207b0f39956Ee035038a1A17c9Fe9bf',
          },
          token: serializedTokens.usdt,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 2,
          lpSymbol: 'TLOS_WAG LP',
          lpAddresses: {
            41: '',
            40: '0xB45378A655683955Cc3235727619F5736698eD4B',
          },
          token: serializedTokens.cake,
          quoteToken: serializedTokens.wtlos,
        },
      ]
    : [
        /**
         * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
         */
        {
          pid: 0,
          v1pid: 0,
          lpSymbol: 'WAG',
          lpAddresses: {
            41: '0x0CcD27B7581b2961c370A1Ed756c4d99eb755FCb',
            40: '',
          },
          token: serializedTokens.syrup,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 1,
          v1pid: 1,
          lpSymbol: 'TLOS_TE6 LP',
          lpAddresses: {
            41: '0xebdd95e186EdB1129a536528f76B1988D01a496d',
            40: '',
          },
          token: serializedTokens.te6,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 2,
          v1pid: 2,
          lpSymbol: 'TLOS_TE9 LP',
          lpAddresses: {
            41: '0x030194Ba1d0Ea8483b0056bE87FAAC58d15e0A43',
            40: '',
          },
          token: serializedTokens.te9,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 3,
          v1pid: 3,
          lpSymbol: 'TLOS_TE12 LP',
          lpAddresses: {
            41: '0x0d049bA53CDa08576C16F37f8737150028F031fC',
            40: '',
          },
          token: serializedTokens.te12,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 4,
          v1pid: 4,
          lpSymbol: 'TLOS_TE18 LP',
          lpAddresses: {
            41: '0x207527a13e5BabCc5e2444919c8c6Bb2DEf0209e',
            40: '',
          },
          token: serializedTokens.te18,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 5,
          v1pid: 5,
          lpSymbol: 'TLOS_WAG LP',
          lpAddresses: {
            41: '0x655F17B5F4B50216F520a0eCA35273687628e9A2',
            40: '',
          },
          token: serializedTokens.cake,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 6,
          v1pid: 6,
          lpSymbol: 'TLOS_USDT LP',
          lpAddresses: {
            41: '0xBE59f845B8DA50F830CFE67bde60889aea3f57db',
            40: '',
          },
          token: serializedTokens.usdt,
          quoteToken: serializedTokens.wtlos,
        },
      ]

export default farms
