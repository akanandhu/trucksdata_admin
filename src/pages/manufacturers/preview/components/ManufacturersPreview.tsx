import { Grid } from '@mui/material'
import ModelsTable from './ModelsTable'
import AboutBrand from './About'
import { useRouter } from 'next/router'
import { manufacturersRows } from 'src/fake-data/rows'
import AddModelDrawer from './AddModelDrawer'
import { useState } from 'react'

const ManufacturersPreview = () => {
  const router = useRouter()
  const id = router?.query?.id

  const data = manufacturersRows?.filter(row => row.id === Number(id))
  const modelData = data?.[0]

  const [open, setOpen] = useState(false)

  function handleAddModal() {
    setOpen(!open)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AboutBrand data={modelData} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ModelsTable id={id} data={modelData} handleAddNew={handleAddModal} />
          </Grid>
        </Grid>
      </Grid>
      <AddModelDrawer open={open} setOpen={setOpen}  />
    </Grid>
  )
}

export default ManufacturersPreview
