const getTokenLogoURL = (address: string) => {
  return `https://github.com/wagyuswapapp/assets/blob/master/blockchains/velas/assets/${address.toLowerCase()}/logo.png?raw=true`
}

export default getTokenLogoURL
