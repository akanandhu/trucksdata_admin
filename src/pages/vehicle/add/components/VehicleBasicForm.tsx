import { Grid } from '@mui/material'
import React, { Fragment } from 'react'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import TextFormField from 'src/components/input-fields/TextFormField'
import { AxelConfigRow, ChasisTypeRow, VehicleTypeRow, manufacturersRows, rows } from 'src/fake-data/rows'
import { StatusRow } from 'src/fake-data/status'
import { renderMenuItemsTitle } from 'src/pages/manufacturers/preview/components/renderMenuItemsTitle'
import { renderMenuItems } from 'src/pages/vehicle-class/components/StatusMenuItems'

const VehicleBasicForm = ({control}:{control: any}) => {
  return (
    <Fragment>
            <Grid item xs={12} sm={6}>
                <TextFormField control={control} id='name' label='Variant Name' required size='medium' />
            </Grid>
            <Grid item xs={12} sm={6}>
            <SelectFormField
                label='Vehicle Class'
                data={rows}
                required
                size={'medium'}
                renderMenuItems={renderMenuItemsTitle}
                control={control}
                id='vehicle_class'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <SelectFormField
                label='Brand Name'
                data={manufacturersRows}
                size={'medium'}
                required
                renderMenuItems={renderMenuItemsTitle}
                control={control}
                id='brand_name'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <SelectFormField
                label='Model Name'
                data={manufacturersRows?.[0]?.models}
                size={'medium'}
                renderMenuItems={renderMenuItemsTitle}
                control={control}
                id='model_name'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <SelectFormField
                label='Axel Configuration'
                data={AxelConfigRow}
                size={'medium'}
                renderMenuItems={renderMenuItemsTitle}
                control={control}
                id='axel_config'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <SelectFormField
                label='Vehicle Type'
                data={VehicleTypeRow}
                size={'medium'}
                renderMenuItems={renderMenuItemsTitle}
                control={control}
                id='vehicle_type'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <SelectFormField
                label='Chasis Option'
                data={ChasisTypeRow}
                size={'medium'}
                renderMenuItems={renderMenuItemsTitle}
                control={control}
                id='chasis_option'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <SelectFormField
                label='Status'
                data={StatusRow}
                size={'medium'}
                required
                renderMenuItems={renderMenuItems}
                control={control}
                id='brand_name'
              />
            </Grid>
            
          </Fragment>
    )
}

export default VehicleBasicForm