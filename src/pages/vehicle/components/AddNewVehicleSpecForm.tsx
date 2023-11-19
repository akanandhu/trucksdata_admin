import { Grid } from '@mui/material'
import ArrayFieldDropDown from 'src/components/ArrayFieldDropDown'
import ArraySelectFieldParent from 'src/components/ArraySelectFieldParent'
import ArrayTextInput from 'src/components/ArrayTextInput'
import DrawerActions from 'src/components/drawers/DrawerActions'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import renderSpecs from 'src/components/renderSpecs'

const AddNewVehicleSpecForm = ({
  control,
  specs,
  handleClose,
  selectedOption,
  setSelectedOption,
  isEdit,
  handleRemove
}: {
  control: any
  specs: any
  handleClose: () => void
  selectedOption: any
  setSelectedOption: any
  isEdit: boolean
  handleRemove?: (val: any) => void
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
          <ArrayFieldDropDown
            displayKey='option'
            label={selectedOption?.specification.name}
            isSpec
            options={options}
            selectedName='option'
            specialValueKey='option'
            valueKey='option'
            control={control}
            handleRemove={handleRemove}
          />
        ) : type === 'text' ? (
          <ArrayTextInput control={control} handleRemove={handleRemove} />
        ) : type === 'nested_drop_down' ? (
          <ArraySelectFieldParent
            control={control}
            label={selectedOption?.specification.name}
            options={options}
            handleRemove={handleRemove}
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
