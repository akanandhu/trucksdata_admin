import { Box, Card, CardHeader, Divider, Grid } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useState } from "react"
import TableHeader from "src/components/TableHeader"
import DeleteConfirmModal from "src/components/modals/DeleteConfirmModal"
import { manufacturersRows } from "src/fake-data/rows"
import useGetManufacturersCols from "./hooks/columns"

const Manufacturers = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [idToRemove, setIdToRemove] = useState('')
    const handleAdd = () => {
        console.log('')
    }
    const [data, setData] = useState(manufacturersRows)
    const {columns} = useGetManufacturersCols({handleDelete, handleEdit, handleView})
    function handleDelete (id:string) {
      setIdToRemove(id)
      setDeleteConfirm(!deleteConfirm)
    }
    function handleEdit () {
      console.log('')
    }
    function handleView () {
      console.log('')
    }

    return(
        <Grid>
        <Card>
          <CardHeader title='Manufacturers' />
          <Divider />
          <TableHeader title='Manufacturers' handleNew={handleAdd} />
          <Box sx={{ height: '100%' }}>
            <DataGrid disableRowSelectionOnClick columns={columns as any} rows={data} />
          </Box>
        </Card>
        <DeleteConfirmModal
          open={deleteConfirm}
          setOpen={setDeleteConfirm}
          remove={data}
          idToRemove={idToRemove}
          setRemoved={setData}
        />
      </Grid> 
    )
}
export default Manufacturers