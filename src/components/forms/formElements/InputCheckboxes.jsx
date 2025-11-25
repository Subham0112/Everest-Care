import React from 'react'

const InputCheckboxes=({checkId, checkName, checkLabel, className, checked, onChange})=>{
    return(
      <div className={`d-flex gap-2 `}>
                  <input
                    type="checkbox"
                    id={checkId}
                    name={checkName}
                    checked={checked}
                    onChange={onChange}
                  />
                  <label htmlFor={checkId} className={`form-check-label ${className}`}>
                  {checkLabel}
                  </label>
                </div>
    )
}

export default InputCheckboxes
