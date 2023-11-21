import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { renderName } from 'src/utils/render-avatar'

interface RowTypes {
  id: string
  name: string
  vehicle_types: any[]
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
            {renderName(row)}
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
        console.log(row, 'rowCheck')

        return (
          <Grid>
           
          </Grid>
        )
      }
    },
    {
      flex: 0.1,
      field: 'district',
      minWidth: 50,
      headerName: 'District',
      renderCell: ({ row }: ParamTypes) => {
        console.log(row, 'rowCheck')

        return (
          <Grid>
           
          </Grid>
        )
      }
    },
    {
      flex: 0.1,
      field: 'phone',
      minWidth: 50,
      headerName: 'Phone',
      renderCell: ({ row }: ParamTypes) => {
        console.log(row, 'rowCheck')

        return (
          <Grid>
           
          </Grid>
        )
      }
    },
    {
      flex: 0.1,
      field: 'email',
      minWidth: 50,
      headerName: 'Email',
      renderCell: ({ row }: ParamTypes) => {
        console.log(row, 'rowCheck')

        return (
          <Grid>
           
          </Grid>
        )
      }
    }
  ]

  return {
    columns
  }
}
export default useGetUserCols
