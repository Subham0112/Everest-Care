import React from 'react'

const InputFields=({label, inputId, inputName, value, onChange}) => {
  return (
      <div className='col-md-4'>
      <label htmlFor={inputId} className="form-label fw-semibold">
                   {label}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={inputId}
                    name={inputName}
                    value={value}
                    onChange={onChange}
                  />
                  </div>
  )
}

export default InputFields
