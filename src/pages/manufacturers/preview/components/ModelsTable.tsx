// ** React Imports
// import { useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'

// import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'

import { getInitials } from 'src/@core/utils/get-initials'
import { Chip, Divider } from '@mui/material'
import SearchHeader from './SearchHeader'
import TableHeader from 'src/components/TableHeader'

interface CellType {
  row: any
}

const renderName = (row: any) => {
  if (row.avatar) {
    return <CustomAvatar src={row?.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        sx={{ mr: 2.5, width: 38, height: 38, fontSize: '1rem' }}
        color={(row?.avatarColor as ThemeColor) || ('primary' as ThemeColor)}
      >
        {getInitials(row.title || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const columns = [
  {
    flex: 0.1,
    field: 'name',
    minWidth: 220,
    headerName: 'Name',
    renderCell: ({ row }: CellType) => {
      const { title, date } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderName(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {title}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled', textTransform: 'capitalize' }}>
              {date}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.075,
    minWidth: 105,
    field: 'vehicle_class',
    headerName: 'Vehicle Class',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.vehicle_class}</Typography>
  },
 
  {
    flex: 0.035,
    minWidth: 60,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => (
      <Chip color={row.status === 'Active' ? 'success' : 'secondary'} label={row.status} />
    )
  },

  {
    flex: 0.035,
    minWidth: 100,
    field: 'actions',
    headerName: 'Actions',
    renderCell: () => (
      <OptionsMenu
        iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
        options={[
          'Details',
          'Archive',
          { divider: true },
          { text: 'Delete', menuItemProps: { sx: { color: 'error.main' } } }
        ]}
      />
    )
  }
]

const ModelsTable = ({ 
  // id,
   data, handleAddNew }: { id: any; data: any; handleAddNew: () => void }) => {
  // ** State
  // const [value, setValue] = useState<string>('')
  // const [pageSize, setPageSize] = useState<number>(7)
  const modelData = data?.models
 
  const handleAddNewModal = () => {
    handleAddNew()
  }

  return (
    <Card>
      <CardHeader title='Models' />
      <Divider />
      <SearchHeader />
      <Divider />
      <TableHeader title='Model' handleNew={handleAddNewModal} paddingX={17}  />
      <DataGrid
        autoHeight
        pagination
        rows={modelData ?? []}
        rowHeight={60}
        columns={columns}

        // pageSize={pageSize}

        // disableSelectionOnClick

        // rowsPerPageOptions={[5, 7, 10]}

        // onPageSizeChange={size => setPageSize(size)}
      />
    </Card>
  )
}

export default ModelsTable
