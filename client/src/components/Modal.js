import { useState } from "react";
import { useCookies } from "react-cookie";



const Modal=({mode , setShowModal, getData, task})=>{

  const [cookies,setcookie,removeCookie]= useCookies(null)

  // const mode= 'create'
  const editMode= mode === 'edit'? true : false

  const [data,setData]=useState({
    user_email: editMode ? task.user_email : cookies.Email ,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : null,
    date: editMode ? task.date: new Date()
    })

    const postData = async (e)=> {
      
      e.preventDefault();
      console.log("here");


      try{
        const response= await fetch(`http://localhost:8000/todos`,{
          method: "POST",
          headers:{'Content-Type' : 'application/json'},
          body: JSON.stringify(data)
        })
        console.log('LATEST DOUBT',response);
        if(response.status===200){
          console.log("ARIF BHOI", response.body);
          setShowModal(false)  
          getData()
        }
      }catch(err){
        console.error(err)
      }

    }

    const editData = async (e)=>{
      e.preventDefault()
      try{
       const response= await fetch(`http://localhost:8000/todos/${task.id}`,{
        method:'PUT',
        headers:{'content-type' : 'application/json'},
        body: JSON.stringify(data)
        })

        console.log(response.status)
          if(response.status===200)
          {
          setShowModal(false)
          getData()
          }
      }
     catch(err){
      console.error(err);
    }
    
  }



  

  const handleChange=(e)=>{
    
    console.log('changing!',e)
    const {name,value}=e.target
    console.log({name,value});
    
    setData(data=>(
      {
       ...data,[name]:value
      }))
    console.log(data)
   }

   // const mode='edit'
   return (
    <div className="overlay">
     <div className='modal'>
       <div className='form-title-container'>
         <h3>LETS {mode} YOUR TASKS!</h3>
         <button onClick={()=> setShowModal(false)}>X</button>
       </div>
      <form>
        <input
          required
          maxLength={30}
          placeholder='YOUR TASK GOES HERE!!'
          name='title'
          value={data.title}
          onChange={handleChange}
        />
        <br/>
        <label id="range">Drag to select your current progress!</label>
        <input
          required
          type='range'
          id="range"
          min={"0"}
          max={"100"}
          name='progress'
          value={data.progress}
          onChange={handleChange}
        />
        <input className={mode}   type="submit" onClick={editMode? editData : postData}  />
      </form>
    </div>
    </div>
   );
}

export default Modal;
