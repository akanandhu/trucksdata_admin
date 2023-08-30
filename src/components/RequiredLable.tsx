import React from 'react'

const RequiredLabel = ({ text }: { text: string }) => {
  return (
    <span>
      {text}
      <span style={{ color: 'red' }}>* </span>
    </span>
  )
}

export default RequiredLabel
