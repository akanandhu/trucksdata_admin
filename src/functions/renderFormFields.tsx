import React, { Fragment } from 'react'
import FieldComponent from 'src/components/FieldComponent'

const renderFormFields = ({ specifications, control }: { specifications: any; control: any }) => {
  return (
    <Fragment>
      {specifications?.length
        ? specifications?.map((spec: any) => {
            const { specification } = spec || {}

            return <FieldComponent key={spec.id} specification={specification} control={control} />
          })
        : null}
    </Fragment>
  )
}

export default renderFormFields
