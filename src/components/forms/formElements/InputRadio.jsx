import React from 'react'

const InputRadio=({radioId, radioName, radioLabel, className, checked, onChange})=>{
    return(
      <div className={`d-flex gap-2 `}>
                  <input
                    type="radio"
                    id={radioId}
                    name={radioName}
                    checked={checked}
                    onChange={onChange}
                  />
                  <label htmlFor={radioId} className={`form-check-label ${className}`}>
                  {radioLabel}
                  </label>
                </div>
    )
}

export default InputRadio
