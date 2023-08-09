import { useEffect,useState } from 'react'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import { useCookies } from 'react-cookie'

const App =()=>{

const [cookies,setCookie,removeCookie]= useCookies(null)
const authToken=  cookies.AuthToken
const userEmail=  cookies.Email
const[tasks,setTasks]=useState(null)

  const getData = async()=>{
  try{
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
     const json = await response.json()
    //  console.log(json)
     setTasks(json)
     
     } 
      catch(err){
      console.error(err);
   } 
}
console.log(tasks);

useEffect(() => getData, [])

//SORT BY DATE
const sortedTasks=tasks?.sort((a,b)=> new Date(b.date)-new Date(a.date))
console.log(sortedTasks);

  return (
    <div className="App">

    {/* VIEWS THE AUTH PAGE IF NOT AUTHORIZED */}

    {!authToken&& <Auth/>}

    {/* VIEWS TASKS ONCE AUTHORIZED AND TOKEN IS PRESENT */}

    {authToken && 
    <>
    <ListHeader listName={"TODOS"} getData={getData} />
    <p className='welcome'>|WELCOME BACK| {cookies.Email}</p>
    {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
    <p className='copyright'>© an App By TARIQUE</p>
    </> 
    }
    </div>
   );
}

export default App;
