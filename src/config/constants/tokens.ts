import { ChainId, Token } from '@wagyu-swap/sdk'
import { serializeToken } from 'state/user/hooks/helpers'
import { CHAIN_ID } from './networks'
import { SerializedToken } from './types'
import addresses from './addresses.json'

const { MAINNET, TESTNET } = ChainId

interface TokenList {
  [symbol: string]: Token
}

const defineTokens = <T extends TokenList>(t: T) => t

export const mainnetTokens = {
  wtlos: new Token(MAINNET, addresses[40].WTLOS, 18, 'WTLOS', 'Wrapped WTLOS', 'https://wagyuswap.app/'),
  // bnb here points to the wbnb contract. Wherever the currency TLOS is required, conditional checks for the symbol 'TLOS' can be used
  tlos: new Token(MAINNET, addresses[40].WTLOS, 18, 'TLOS', 'TLOS', 'https://wagyuswap.app/'),
  cake: new Token(MAINNET, addresses[40].WAGToken, 18, 'WAG', 'WAGToken', 'https://wagyuswap.app/'),
  usdt: new Token(
    MAINNET,
    '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
    6,
    'USDT',
    'Multichain Tether USD',
    'https://wagyuswap.app/',
  ),
  weth: new Token(
    MAINNET,
    '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
    18,
    'WETH',
    'Multichain WETH',
    'https://wagyuswap.app/',
  ),
  bnb: new Token(MAINNET, '0x2c78f1b70ccf63cdee49f9233e9faa99d43aa07e', 18, 'BNB', 'BNB', 'https://wagyuswap.app/'),
  usdc: new Token(
    MAINNET,
    '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b',
    6,
    'USDC',
    'Telos USDC',
    'https://wagyuswap.app/',
  ),
  avax: new Token(
    MAINNET,
    '0x7c598c96d02398d89fbcb9d41eab3df0c16f227d',
    18,
    'AVAX',
    'Telos AVAX',
    'https://wagyuswap.app/',
  ),
  ftm: new Token(
    MAINNET,
    '0xc1be9a4d5d45beeacae296a7bd5fadbfc14602c4',
    18,
    'FTM',
    'Telos FTM',
    'https://wagyuswap.app/',
  ),
  matic: new Token(
    MAINNET,
    '0x332730a4f6e03d9c55829435f10360e13cfa41ff',
    18,
    'MATIC',
    'Telos Polygon',
    'https://wagyuswap.app/',
  ),
  wbtc: new Token(
    MAINNET,
    '0xf390830df829cf22c53c8840554b98eafc5dcbc2',
    18,
    'WBTC',
    'Wrapped Bitcoin',
    'https://wbtc.network/',
  ),
  syrup: new Token(TESTNET, addresses[40].WAGStake, 18, 'WAGStake', 'WAGStake Token', 'https://wagyuswap.app/'),
  te6: new Token(TESTNET, addresses[41].TE6, 6, 'TE6', 'ERC20 Token', 'https://wagyuswap.app/'),
  te9: new Token(TESTNET, addresses[41].TE9, 9, 'TE9', 'ERC20 Token', 'https://wagyuswap.app/'),
  te12: new Token(TESTNET, addresses[41].TE12, 12, 'TE12', 'ERC20 Token', 'https://wagyuswap.app/'),
  te18: new Token(TESTNET, addresses[41].TE18, 18, 'TE18', 'ERC20 Token', 'https://wagyuswap.app/'),
}

export const testnetTokens = {
  wtlos: new Token(TESTNET, addresses[41].WTLOS, 18, 'WTLOS', 'Wrapped TLOS', 'https://wagyuswap.app/'),
  cake: new Token(TESTNET, addresses[41].WAGToken, 18, 'WAG', 'WAGToken', 'https://wagyuswap.app/'),
  syrup: new Token(TESTNET, addresses[41].WAGStake, 18, 'WAGStake', 'WAGStake Token', 'https://wagyuswap.app/'),
  usdt: new Token(
    TESTNET,
    '0xb9746c6b50ad85833b062eb6b81245b9df0fd738',
    18,
    'USDT',
    'Telos USDT',
    'https://wagyuswap.app/',
  ),
  usdc: new Token(
    TESTNET,
    '0x104f1cd7caeda9a7aa5c0a416d14880aa0a8a7e3',
    18,
    'USDC',
    'Telos USDC',
    'https://wagyuswap.app/',
  ),
  weth: new Token(
    TESTNET,
    '0xe94afce6d42f27aaca09af470181de1965aa719b',
    18,
    'WETH',
    'Multichain WETH',
    'https://wagyuswap.app/',
  ),
  te6: new Token(TESTNET, addresses[41].TE6, 6, 'TE6', 'ERC20 Token', 'https://wagyuswap.app/'),
  te9: new Token(TESTNET, addresses[41].TE9, 9, 'TE9', 'ERC20 Token', 'https://wagyuswap.app/'),
  te12: new Token(TESTNET, addresses[41].TE12, 12, 'TE12', 'ERC20 Token', 'https://wagyuswap.app/'),
  te18: new Token(TESTNET, addresses[41].TE18, 18, 'TE18', 'ERC20 Token', 'https://wagyuswap.app/'),
}

const tokens = () => {
  const chainId = CHAIN_ID

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (parseInt(chainId, 10) === ChainId.TESTNET) {
    return Object.keys(testnetTokens).reduce((accum, key) => {
      return { ...accum, [key]: testnetTokens[key] }
    }, {} as typeof testnetTokens)
    // return Object.keys(mainnetTokens).reduce((accum, key) => {
    //   return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] }
    // }, {} as typeof testnetTokens & typeof mainnetTokens)
  }

  return mainnetTokens
}

const unserializedTokens = tokens()

type SerializedTokenList = Record<keyof typeof unserializedTokens, SerializedToken>

export const serializeTokens = () => {
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(unserializedTokens[key]) }
  }, {} as SerializedTokenList)

  return serializedTokens as any
}

export default unserializedTokens
