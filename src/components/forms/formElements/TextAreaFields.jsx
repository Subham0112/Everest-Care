import React from 'react'

const TextAreaFields=({label, inputId, inputName, value,rows, onChange}) => {
  return (
      <div className='col-md-9'>
      <label htmlFor={inputId} className="form-label fw-semibold">
                   {label}
                  </label>
                  <textarea
                    type="text"
                    rows={rows||5}
                    className="form-control"
                    id={inputId}
                    name={inputName}
                    value={value || ""}
                    onChange={onChange}
                  />
                  </div>
  )
}

export default TextAreaFields
