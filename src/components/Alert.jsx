import React from 'react'

export default function Alert({alert}) {
  let alertMsg="";
if (alert!=null) {
  alertMsg =<div class={`alert alert-${alert.type} alert-dismissible fade show fixed-top m-0`} role="alert">
  {alert.message}
</div>

}else{
    alertMsg="";
}

  
    return (
    
    <div className="alert-container">
      {alertMsg}
    </div>
  )
}
