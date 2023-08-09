import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";



const ListHeader=({listName , getData})=>{
    const [showModal,setShowModal]= useState(false)
    const [cookies,setcookie,removeCookie]=useCookies(null)
    const signOut=()=>{
      removeCookie('email')
      removeCookie('AuthToken')
      // alert("signed out");
    }
  return (
    <div className="ListHeader">
    <h1>{listName}</h1>
    <div className="button-container">
    <button className="create" onClick={() =>setShowModal(true)}>CREATE</button>
    <button className="signout" onClick={signOut}>SIGN OUT</button>
    {/* <button onClick={signOut}>SIGN OUT</button> */}
    
    </div>
    {showModal && <Modal mode={'create'} getData={getData} setShowModal={setShowModal}/>}
    </div>
  );
}
export default ListHeader;
