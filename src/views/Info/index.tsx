import { PoolUpdater, ProtocolUpdater, TokenUpdater } from 'state/info/updaters'
import styled from 'styled-components'
import InfoNav from './components/InfoNav'

const PageWrapper = styled.div<{ bgUrl: string }>`
  position: relative;
  &:after {
    position: absolute;
    content: ' ';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: url(${(props) => props.bgUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    z-index: -1;
  }
`

export const InfoPageLayout = ({ children }) => {
  return (
    <PageWrapper bgUrl="/images/info/bg.png">
      <ProtocolUpdater />
      <PoolUpdater />
      <TokenUpdater />
      <InfoNav />
      {children}
    </PageWrapper>
  )
}
