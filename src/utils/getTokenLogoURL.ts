import { ChainId } from '@wagyu-swap/sdk'
import { CHAIN_ID } from 'config/constants/networks'

const chainId = parseInt(CHAIN_ID, 10) as ChainId

const getTokenLogoURL = (address: string) => {
  return `https://github.com/wagyuswapapp/assets/blob/master/blockchains/telos${
    chainId === ChainId.TESTNET ? '-test' : ''
  }/assets/${address.toLowerCase()}/logo.png?raw=true`
}

export default getTokenLogoURL
