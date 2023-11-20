import { InputAdornment, MenuItem, TextField, Select, InputLabel, FormControl, Divider, Box } from '@mui/material'
import { GridSearchIcon } from '@mui/x-data-grid'
import React, { SetStateAction } from 'react'
import ButtonSpinner from '../spinner/ButtonSpinner'
import RequiredLabel from '../RequiredLable'

const SearchableSelect = ({
  value,
  onChange,
  searchValue,
  setSearchValue,
  isDataFetched,
  isFetchingNextPage,
  refProp,
  data,
  size,
  label,
  required,
  renderMenuItems,
  isParentDisabled,
  isDisabled,
  handleOpen,
  handleClose,
  isChartField
}: {
  value: any
  onChange: (e: any) => void
  searchValue: string
  setSearchValue: React.Dispatch<SetStateAction<string>>
  isDataFetched?: boolean
  isFetchingNextPage?: boolean
  refProp?: any
  data?: any
  size?: any
  label?: string
  required?: boolean
  renderMenuItems?: any
  isParentDisabled?: boolean
  isDisabled?: boolean
  handleClose?: () => void
  handleOpen?: () => void
  isChartField?: boolean
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id='input-label'>
          {label && required ? <RequiredLabel text={label} /> : label ? label : ''}
        </InputLabel>
        <Select
          size={size ?? 'small'}
          value={value}
          onChange={onChange}
          onOpen={handleOpen && handleOpen}
          onClose={handleClose && handleClose}
          label={label ?? ''}
          disabled={isDisabled}
          sx={{ width: '100%' }}
          labelId='input-label'
          {...(isChartField && {
            renderValue: selected => {
              if (isChartField) {
                const selectedChart = data?.find((obj: { id: string }) => obj?.id === selected)

                return <Box>{selectedChart?.account_name}</Box>
              }
            }
          })}
          inputProps={{ placeholder: 'Select User' }}
          MenuProps={{
            autoFocus: false,
            PaperProps: {
              style: {
                maxHeight: 200,
                boxSizing: 'border-box',
                marginTop: '2px'
              }
            }
          }}
        >
          <>
            <TextField
              fullWidth
              placeholder='Search'
              size='small'
              value={searchValue}
              disabled={isDisabled}
              onKeyDown={e => {
                e.stopPropagation()
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e)}
              sx={{ padding: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {isDataFetched ? (
                      <GridSearchIcon />
                    ) : (
                      <div style={{ paddingRight: 10, justifyItems: 'center', alignItems: 'center' }}>
                        {' '}
                        <ButtonSpinner />{' '}
                      </div>
                    )}
                  </InputAdornment>
                )
              }}
            />
          </>
          <MenuItem key={null} value={''}>
            Select a value
          </MenuItem>
          {data && data?.map((obj: any) => renderMenuItems(obj, isParentDisabled))}
          {isFetchingNextPage && (
            <MenuItem>
              <ButtonSpinner />
            </MenuItem>
          )}
          <Divider ref={refProp} />
        </Select>
      </FormControl>
    </>
  )
}

export default SearchableSelect
