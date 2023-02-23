import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'
import { CHAIN_ID } from './networks'
import { ChainId } from '@wagyu-swap/sdk'

const serializedTokens = serializeTokens()

const chainId = parseInt(CHAIN_ID, 10)
const { MAINNET } = ChainId

export const VLX_WAG_FARM_PID = chainId === MAINNET ? 1 : 5 // WAG-TLOS (2)
export const VLX_USDT_FARM_PID = chainId === MAINNET ? 5 : 6 // USDT-TLOS (3)

const farms: SerializedFarmConfig[] =
  chainId === MAINNET
    ? [
        {
          pid: 0,
          v1pid: 0,
          lpSymbol: 'WAG',
          lpAddresses: {
            41: '',
            40: '0xaBf26902Fd7B624e0db40D31171eA9ddDf078351',
          },
          token: serializedTokens.syrup,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 1,
          v1pid: 1,
          lpSymbol: 'TLOS_WAG LP',
          lpAddresses: {
            41: '',
            40: '0x33f879690C165cC320B0BA04cEb1F9CeaC80F376',
          },
          token: serializedTokens.cake,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 2,
          v1pid: 2,
          lpSymbol: 'TLOS_ETH LP',
          lpAddresses: {
            41: '',
            40: '0x7c3F1eA99770aa23Fe1b19097c93BB0cF34C8351',
          },
          token: serializedTokens.weth,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 3,
          v1pid: 3,
          lpSymbol: 'TLOS_BUSD LP',
          lpAddresses: {
            41: '',
            40: '0x8e2B762Bee3E2bf2C8fB0cdd04274042748D6C23',
          },
          token: serializedTokens.busd,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 4,
          v1pid: 4,
          lpSymbol: 'TLOS_USDC LP',
          lpAddresses: {
            41: '',
            40: '0x757Ac3cDFfa84b67dFC58c5880Aa8037ef5a23d5',
          },
          token: serializedTokens.usdc,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 5,
          v1pid: 5,
          lpSymbol: 'TLOS_USDT LP',
          lpAddresses: {
            41: '',
            40: '0x7F3cB73FC470c2c9F543FdD17dF4De0e97b51A97',
          },
          token: serializedTokens.usdt,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 6,
          v1pid: 6,
          lpSymbol: 'TLOS_BITORB LP',
          lpAddresses: {
            41: '',
            40: '0xa4c1Ee69750Ff17a2fa561D697E2fb23f4e0A842',
          },
          token: serializedTokens.bitorb,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 7,
          v1pid: 7,
          lpSymbol: 'TLOS_SCAR LP',
          lpAddresses: {
            41: '',
            40: '0x9D4192D18c49dd9e4DBC3892dd55Cd8EC4081299',
          },
          token: serializedTokens.scar,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 10,
          v1pid: 10,
          lpSymbol: 'WAG_ASTRO LP',
          lpAddresses: {
            41: '',
            40: '0x40AC95e5855878e614f838ABf2b84853e84F188d',
          },
          token: serializedTokens.astro,
          quoteToken: serializedTokens.cake,
        },
        {
          pid: 11,
          v1pid: 11,
          lpSymbol: 'WAG_SWAPZ LP',
          lpAddresses: {
            41: '',
            40: '0x3f3C905210411F6E7D881889AffBA5051fC9294b',
          },
          token: serializedTokens.swapz,
          quoteToken: serializedTokens.cake,
        },
        {
          pid: 12,
          v1pid: 12,
          lpSymbol: 'WAG_USDV LP',
          lpAddresses: {
            41: '',
            40: '0x545Dad8f8F934b6E5fa408FEC3da59651228Ee9E',
          },
          token: serializedTokens.usdv,
          quoteToken: serializedTokens.cake,
        },
        {
          pid: 13,
          v1pid: 13,
          lpSymbol: 'WAG_BUSD LP',
          lpAddresses: {
            41: '',
            40: '0x339977398975dcD543f3873194B9238A96Ac79dE',
          },
          token: serializedTokens.busd,
          quoteToken: serializedTokens.cake,
        },
        {
          pid: 14,
          v1pid: 14,
          lpSymbol: 'TLOS_VDGT LP',
          lpAddresses: {
            41: '',
            40: '0x7b714BC5dD176EaA198fe6C07E415a87A40dc858',
          },
          token: serializedTokens.vdgt,
          quoteToken: serializedTokens.wtlos,
        },
        {
          pid: 15,
          v1pid: 15,
          lpSymbol: 'BUSD_USDV LP',
          lpAddresses: {
            41: '',
            40: '0x5bF6d526C5C0AdfEA5853941f7B59261ea071Da6',
          },
          token: serializedTokens.usdv,
          quoteToken: serializedTokens.busd,
        },
        {
          pid: 16,
          v1pid: 16,
          lpSymbol: 'WBTC_USDV LP',
          lpAddresses: {
            41: '',
            40: '0x90724ea2D9D9decE420C9413850401DA9dccb514',
          },
          token: serializedTokens.wbtc,
          quoteToken: serializedTokens.usdv,
        },
        {
          pid: 17,
          v1pid: 17,
          lpSymbol: 'DAI_USDV LP',
          lpAddresses: {
            41: '',
            40: '0x0a2c396e388Edb05BbAb98F511BFceC11f643226',
          },
          token: serializedTokens.dai,
          quoteToken: serializedTokens.usdv,
        },
        {
          pid: 18,
          v1pid: 18,
          lpSymbol: 'AVAX_WAG LP',
          lpAddresses: {
            41: '',
            40: '0xF20C64b3c070688dCB39ECb28e69FC13e2E4D37c',
          },
          token: serializedTokens.avax,
          quoteToken: serializedTokens.cake,
        },
        {
          pid: 19,
          v1pid: 19,
          lpSymbol: 'MATIC_WAG LP',
          lpAddresses: {
            41: '',
            40: '0xdbbCBf9FbFe8E2FCd80E30894c9320e995e77b97',
          },
          token: serializedTokens.matic,
          quoteToken: serializedTokens.cake,
        },
        {
          pid: 20,
          v1pid: 20,
          lpSymbol: 'BNB_WAG LP',
          lpAddresses: {
            41: '',
            40: '0x133F317F41f8b4d749A0a559761681767aF69a27',
          },
          token: serializedTokens.bnb,
          quoteToken: serializedTokens.cake,
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
            41: '0x355108903c6BFee699C493CD5e13795C43EF81Bd',
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
            41: '0xa5c5df71E23cd11f79EA4ce3C74F1FE036DA9a29',
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
            41: '0xfb3EDBDf6Bc0E20346728761c525603da76bDf7C',
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
            41: '0xD07443d96B710A18603609678a2C8a4B37b731C1',
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
            41: '0x3470A1d994dADf4fB5e899922d2EC2584e3D995a',
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
            41: '0x7A3D4Df3F11F5BC54bA757e3FE01aDEe2B6c2e9B',
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
            41: '0x3108a4ec070fc51f74ce00cda009578d594e35b8',
            40: '',
          },
          token: serializedTokens.usdt,
          quoteToken: serializedTokens.wtlos,
        },
      ]

export default farms
