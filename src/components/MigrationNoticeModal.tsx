import useTheme from 'hooks/useTheme'
import { Box, Modal, Text, useModal, Link } from 'packages/uikit'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const MigrationLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text} !important;
`

const MigrationWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  justify-content: center;
`

const MigrationNoticeModalWrapper = () => {
  const { theme } = useTheme()

  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <Modal
      title={`Migration to V2`}
      onDismiss={() => setVisible(false)}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      <Box>
        <Text>Can't find your funds?</Text>
        <Text>Please migrate your pools and farms to V2</Text>
        <MigrationWrapper>
          <MigrationLink href={'/migration'} className="text">
            Go to migration page
          </MigrationLink>
        </MigrationWrapper>
      </Box>
    </Modal>
  )
}

export const MigrationNoticeModal = () => {
  const [onPresent] = useModal(<MigrationNoticeModalWrapper />)

  useEffect(() => {
    onPresent()
  }, [])

  return null
}
