import Avatar from "src/@core/components/mui/avatar"
import { ThemeColor } from "src/@core/layouts/types"



export const getInitials = (string: string) =>
  string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')


export const renderName = (row: any) => {
    if (row.logo) {
      return <Avatar src={row.logo} sx={{ mr: 2, width: 35, height: 35 }} />
    } else {
      return (
        <Avatar
          skin='light'
          sx={{ mr: 2, width: 35, height: 35, fontSize: '0.875rem' }}
          color={(row.avatarColor as ThemeColor) || ('primary' as ThemeColor)}
        >
          {getInitials(row.title || 'John Doe')}
        </Avatar>
      )
    }
  }