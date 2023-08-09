import { useState } from 'react';
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import Modal from './Modal';



const ListItem=({task ,getData, data })=>{
  const[showModal,setShowModal]= useState(false)

  const deleteData = async (e)=>{
    e.preventDefault()
    try{
     const response= await fetch(`http://localhost:8000/todos/${task.id}`,{
      method:'DELETE',
      // headers:{'content-type' : 'application/json'},
      // body: JSON.stringify(data)
      })
      console.log(response.status)
        if(response.status===200)
        {
        // setShowModal(false)
        getData()
        }
    }
   catch(err){
    console.error(err);
  }
  
}

  return (

    <li className="List-Items">
        <div className="info-container">
          <TickIcon/>
          <p className="task-title">{task.title}</p>
          <ProgressBar progress={task.progress}/>
         </div>
        <div className="button-container">
         <button onClick={() => setShowModal(true)} className="edit">EDIT</button>
         <button className="delete" onClick={deleteData}>DELETE</button>
        </div> 

    {showModal && <Modal mode={'edit'} getData={getData} setShowModal={setShowModal} task={task}/>}
    </li>
  );
}

export default ListItem;
