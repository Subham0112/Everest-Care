import React from 'react'

export default function Alert({alert}) {
  let alertMsg="";
if (alert!=null) {
  alertMsg =<div class={`alert alert-${alert.type} alert-dismissible fade show fixed-top m-0`} role="alert">
  {alert.message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

}else{
    alertMsg="";
}

  
    return (
    
    <div>
      {alertMsg}
    </div>
  )
}
