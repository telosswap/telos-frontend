import styled from 'styled-components'
import { Box, Flex } from 'packages/uikit'
import Footer from 'components/Menu/Footer'
import { PageMeta } from 'components/Layout/Page'
import { EXCHANGE_DOCS_URLS } from 'config/constants'

const StyledPage = styled.div<{ $bg?: string; $removePadding: boolean; $noMinHeight }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${({ $removePadding }) => ($removePadding ? '0' : '16px')};
  padding-bottom: 0;
  min-height: ${({ $noMinHeight }) => ($noMinHeight ? 'initial' : 'calc(100vh - 64px)')};
  background: ${({ theme }) => theme.colors.gradients.bubblegum};

  position: relative;

  &:after {
    position: absolute;
    content: ' ';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: url(${(props) => props.$bg});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '24px')};
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '32px')};
    padding-bottom: 0;
    min-height: ${({ $noMinHeight }) => ($noMinHeight ? 'initial' : 'calc(100vh - 100px)')};
  }
`

const Page: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    removePadding?: boolean
    hideFooterOnDesktop?: boolean
    noMinHeight?: boolean
    helpUrl?: string
    bgUrl?: string
  }
> = ({
  children,
  removePadding = false,
  hideFooterOnDesktop = false,
  noMinHeight = false,
  helpUrl = EXCHANGE_DOCS_URLS,
  bgUrl,
  ...props
}) => {
  return (
    <>
      <PageMeta />
      <StyledPage $bg={bgUrl} $removePadding={removePadding} $noMinHeight={noMinHeight} {...props}>
        {children}
        <Flex flexGrow={1} />
        <Box display={['block', null, null, hideFooterOnDesktop ? 'none' : 'block']} width="100%">
          <Footer helpUrl={helpUrl} />
        </Box>
      </StyledPage>
    </>
  )
}

export default Page
