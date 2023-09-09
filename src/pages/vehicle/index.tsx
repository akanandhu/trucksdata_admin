import { Box, Card, CardHeader, Divider, Grid } from "@mui/material"
import TableHeader from "src/components/TableHeader"

import VehicleSearchHeader from "./components/VehicleSearchHeader"
import { useRouter } from "next/router"
import { DataGrid } from "@mui/x-data-grid"
import useGetVehicleColumns from "./hooks/useGetVehicleColumns"
import { vehicles } from "src/fake-data/vehicles"

// import { useState } from "react"

const Vehicle = () => {

    const router = useRouter()

    function handleAdd () {
            router.push('/vehicle/add/')
    }

    const columns = useGetVehicleColumns()

    // const [deleteConfirm, setDeleteConfirm] = useState(false)

    return (
        <Grid>
        <Card>
          <CardHeader title='Vehicle' />
          <Divider />
            <VehicleSearchHeader />
          <Divider />

          <TableHeader title='Vehicle' handleNew={handleAdd} paddingX={16} />
          <Box sx={{ height: '100%' }}>
            <DataGrid  disableRowSelectionOnClick columns={columns} rows={vehicles} />
          </Box>
        </Card>
        {/* <DeleteConfirmModal
          open={deleteConfirm}
          setOpen={setDeleteConfirm}
          remove={vehicles}
          idToRemove={idToRemove}
          setRemoved={setData}
        /> */}
      </Grid>  
    )
}
export default Vehicle