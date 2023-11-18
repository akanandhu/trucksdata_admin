import { Grid } from '@mui/material'
import DrawerActions from 'src/components/drawers/DrawerActions'
import MultipleSelectFormField from 'src/components/input-fields/MultipleSelectFormField'
import MultipleTextField from 'src/components/input-fields/MultipleTextField'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import { renderParentMenuItems } from 'src/components/renderParentMenuItems'
import renderSpecs from 'src/components/renderSpecs'
import { flattenOptions } from 'src/functions/flattenOptions'

const AddNewVehicleSpecForm = ({
  control,
  specs,
  handleClose,
  selectedOption,
  setSelectedOption,
  isEdit
}: {
  control: any
  specs: any
  handleClose: () => void
  selectedOption: any
  setSelectedOption: any
  isEdit: boolean
}) => {
  function handleSpecChange(spec: any) {
    const specId = spec.target.value
    const selected = specs?.find((item: { specification_id: number }) => item.specification_id === specId)
    setSelectedOption(selected)
  }

  const type = selectedOption?.specification?.data_type

  const options = selectedOption?.specification?.options || selectedOption?.options

  return (
    <>
      <Grid item xs={12}>
        <SelectFormField
          control={control}
          id='specification_id'
          renderMenuItems={renderSpecs}
          data={specs ?? []}
          size={'medium'}
          placeholder='Specification'
          label='Specification'
          isDisabled={isEdit}
          handleOnChange={e => handleSpecChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        {type === 'drop_down' ? (
          <MultipleSelectFormField
            data={options ?? []}
            control={control}
            label={selectedOption?.specification.name}
            id={selectedOption?.specification.name}
            selectedName='option'
            displayKey='option'
            valueKey='option'
            specialValueKey='option'
            isSpec={true}
          />
        ) : type === 'text' ? (
          <MultipleTextField
            control={control}
            fieldName={selectedOption?.specification.name}
            label={selectedOption?.specification.name}
            textFieldType='text'
          />
        ) : type === 'nested_drop_down' ? (
          <SelectFormField
            label={selectedOption?.specification.name}
            data={flattenOptions(options) ?? []}
            size={'medium'}
            renderMenuItems={renderParentMenuItems}
            control={control}
            id={selectedOption?.specification.name}
          />
        ) : null}
      </Grid>
      <Grid padding={6}>
        <DrawerActions handleClose={handleClose} />
      </Grid>
    </>
  )
}

export default AddNewVehicleSpecForm
