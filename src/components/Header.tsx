import styled from '@emotion/styled'
import { Box, BoxProps } from '@mui/material'

const Header = styled(Box)<BoxProps>(({ theme }: {theme: any}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))
export default Header
