import { useState } from "react";
function Security(){
    const [settings,setSettings] = useState(false)

    
    return(
        <div>
            <div style={{display:"flex", flexDirection:"row"}}>
              <input
              className={`form-control form-control-lg `}
              style={{ width: "50%" }}
              type='text'
              placeholder='Name'
            />   
<button
          type='button'
          class='btn btn-warning'
          >
            Переназначить автора
          </button>
              </div>     
             <button
             style={{marginTop:"10px"}}
          type='button'
          class='btn btn-danger'
        >
          Удалить таблицу
        </button>


        </div>
    )
}
export default Security;