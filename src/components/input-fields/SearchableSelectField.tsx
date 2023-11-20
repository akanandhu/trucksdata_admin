import React, { SetStateAction } from 'react'
import { Controller, FieldError } from 'react-hook-form'
import SearchableSelect from './SearchableSelect'
import { Grid } from '@mui/material'
import ErrorBox from '../ErrorBox'

type SearchableSelectControlledProps = {
  id: string
  control: any
  searchValue: string
  setSearchValue: React.Dispatch<SetStateAction<string>>
  label?: string
  size?: any
  required?: boolean
  data?: any
  renderMenuItems?: any
  isParentDisabled?: boolean
  isDataFetched?: boolean
  refProp?: any
  isFetchingNextPage?: boolean
  isDisabled?: boolean
  error?: FieldError
  handleOnChange?: (e: any) => void
  handleOpen?: () => void
  handleClose?: () => void
}

const SearchableSelectControlled = (props: SearchableSelectControlledProps) => {
  const {
    id,
    control,
    searchValue,
    setSearchValue,
    label,
    size,
    required,
    data,
    renderMenuItems,
    isParentDisabled,
    isDataFetched,
    refProp,
    isFetchingNextPage,
    isDisabled,
    error,
    handleOnChange,
    handleOpen,
    handleClose
  } = props

  return (
    <Grid width={'100%'}>
      <Controller
        name={id}
        control={control}
        render={({ field: { value, onChange } }) => (
          <SearchableSelect
            required={required}
            label={label}
            size={size}
            value={value}
            onChange={e => {
              onChange(e)
              handleOnChange && handleOnChange(e)
            }}
            handleOpen={handleOpen && handleOpen}
            handleClose={handleClose && handleClose}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            data={data}
            renderMenuItems={renderMenuItems}
            isParentDisabled={isParentDisabled}
            isDataFetched={isDataFetched}
            refProp={refProp}
            isFetchingNextPage={isFetchingNextPage}
            isDisabled={isDisabled}
          />
        )}
      />
      {error && <ErrorBox error={error} />}
    </Grid>
  )
}

export default SearchableSelectControlled
