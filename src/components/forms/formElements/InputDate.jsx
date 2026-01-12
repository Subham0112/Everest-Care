import React from 'react'

const InputDate=({dateId, dateName, dateLabel, value, onChange})=>{
  return(
    <div className='col-md-4'>
      <label htmlFor={dateId} className="form-label fw-semibold">
                     {dateLabel}
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id={dateId}
                      name={dateName}
                      value={value || ""}
                      onChange={onChange}
                    />
        </div>
  )
}

export default InputDate
