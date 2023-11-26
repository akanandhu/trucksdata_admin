import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

interface RowTypes {
  id: string
  name: string
  state: string
  district: string
  phone: string
  email: string
}

interface ParamTypes {
  row: RowTypes
}

const useGetUserCols = () => {
  const columns = [
    {
      flex: 0.1,
      field: 'name',
      minWidth: 220,
      headerName: 'Name',
      renderCell: ({ row }: ParamTypes) => {
        const { name } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
                {name}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      field: 'state',
      minWidth: 50,
      headerName: 'State',
      renderCell: ({ row }: ParamTypes) => {
        return <Grid>{row?.state ?? ''}</Grid>
      }
    },
    {
      flex: 0.1,
      field: 'district',
      minWidth: 50,
      headerName: 'District',
      renderCell: ({ row }: ParamTypes) => {
        return <Grid>{row?.district}</Grid>
      }
    },
    {
      flex: 0.1,
      field: 'email',
      minWidth: 50,
      headerName: 'Email',
      renderCell: ({ row }: ParamTypes) => {
        return <Grid>{row?.email}</Grid>
      }
    }
  ]

  return {
    columns
  }
}
export default useGetUserCols
