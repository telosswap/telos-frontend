import useSWR from 'swr'
import { useTranslation } from 'contexts/Localization'
import { getLeastMostPriceInCollection } from 'state/nftMarket/helpers'
import { StatBoxItem, StatBoxItemProps } from '../components/StatBox'

interface LowestPriceStatBoxItemProps extends Omit<StatBoxItemProps, 'title' | 'stat'> {
  collectionAddress: string
}

const LowestPriceStatBoxItem: React.FC<LowestPriceStatBoxItemProps> = ({ collectionAddress, ...props }) => {
  const { t } = useTranslation()
  const { data: lowestCollectionPrice = null } = useSWR(
    collectionAddress ? [collectionAddress, 'lowestPrice'] : null,
    () => getLeastMostPriceInCollection(collectionAddress),
  )

  const formattedLowestPrice =
    lowestCollectionPrice !== null
      ? lowestCollectionPrice
        ? lowestCollectionPrice.toLocaleString(undefined, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })
        : '-'
      : null

  return <StatBoxItem title={t('Lowest (%symbol%)', { symbol: 'TLOS' })} stat={formattedLowestPrice} {...props} />
}

export default LowestPriceStatBoxItem
