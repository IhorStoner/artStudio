import React from 'react'

function TextField({
  input,
  label,
  type,
  meta: { asyncValidating, touched, error, warning },
  ...rest
}) {

  let labelColor;

  if (error) {
    labelColor = 'red'
  } else if (warning) {
    labelColor = 'yellow'
  }
  const message = error || warning;
  return (
    <input
      label={label}
      type={type}
      loading={asyncValidating}
      {...input}
      {...rest}
    />
  )
}

export default TextField;



// Domain: xlia.vip
// Type:   unauthorized
// Detail:   
// "<!doctype html><html lang=\"en\"><head><meta
// charset=\"utf-8\"/><meta name=\"viewport\"
// content=\"width=device-width,initial-scale=1\"/>"  