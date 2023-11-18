import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import { UseFormHandleSubmit } from 'react-hook-form'
import ErrorBox from 'src/components/ErrorBox'
import DrawerActions from 'src/components/drawers/DrawerActions'
import MultipleSelectFormField from 'src/components/input-fields/MultipleSelectFormField'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import { renderSpecMenuItems } from 'src/components/renderSpecCategoryMenu'
import { Datum } from 'src/types/EnergySources'
import { VehicleClassSpecTypes } from 'src/types/VehicleClass'

interface ClassSpecForms {
  energySources: Datum[]
  handleSubmit: UseFormHandleSubmit<VehicleClassSpecTypes>
  onSubmit: (data: VehicleClassSpecTypes) => void
  isLoading: boolean
  error: any
  handleClose: () => void
  apiError: any
  control: any
  specs: any
  ref: any
}

const VehicleClassSpecsForm = (props: ClassSpecForms) => {
  const { energySources, handleSubmit, onSubmit, ref, isLoading, error, handleClose, apiError, control, specs } = props
  const [specifications, setSpecifications] = useState([])

  function handleEnergyChange(energy: string) {
    const data: any = energySources.find((item: any) => item.id === energy)
    const selectedSpec = data?.specifications
    const ids = selectedSpec?.map((spec: { specification_id: number }) => spec?.specification_id)
    const filteredSpecs = specs?.filter((spec: { id: string }) => !ids.includes(spec.id))
    setSpecifications(filteredSpecs ?? [])
  }

  return (
    <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <SelectFormField
              data={energySources ?? []}
              id='energy_source_id'
              label='Energy Source'
              size='medium'
              required
              control={control}
              renderMenuItems={renderSpecMenuItems}
              handleOnChange={e => handleEnergyChange(e.target.value)}
            />
            {error.energy_source_id && <ErrorBox error={error.energy_source_id} />}
          </Grid>
          <Grid item xs={12}>
            <MultipleSelectFormField
              valueKey='id'
              ref={ref}
              control={control}
              data={specifications ?? []}
              id='specifications'
              label={'Specifications'}
            />
          </Grid>
        </Grid>
        {apiError && <ErrorBox error={apiError} />}
        <DrawerActions addDisabled={isLoading} handleClose={handleClose} />
      </form>
    </Box>
  )
}

export default VehicleClassSpecsForm
