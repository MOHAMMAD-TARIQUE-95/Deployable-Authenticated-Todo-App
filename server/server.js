const PORT= process.env.PORT ?? 8000
const express = require('express')
const app= express()
const pool=require('./db')
const cors= require('cors')
const {v4: uuidv4}=require('uuid')
const bcrypt =require('bcrypt')
const jwt= require('jsonwebtoken')


// app.get('/tarique',(req,res)=>
// {
// res.send("igkhhfdhgh jhgjgkbk fugknlkjo jgygn,n ffkjnn jhfuygkjn,bt ")
// })


// cors and express being used in app(express)
app.use(cors())
app.use(express.json())

//GET ALL TODOS //

app.get('/todos/:userEmail',async(req,res)=>{

const {userEmail}= req.params
// console.log(userEmail);
// console.log('SHOWING RQEUEST',req);
    try{
     const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1',[userEmail])
     res.json(todos.rows)
    }
    catch(err)
    {
    // console.log("trq")
    console.error(err)
    }
})

//CREATE NEW TODO
app.post('/todos', async(req, res)=>{
    const {user_email, title , progress, date}=req.body
    console.log('TARIQUE',req.body);
    // console.log(user_email, title , progress, date);
    const id = uuidv4()
    try{
    const newToDo= await pool.query(`INSERT INTO todos(id,user_email ,title, progress,date) 
    VALUES($1,$2,$3,$4,$5)`,[id,user_email, title , progress, date])
     
    res.json(newToDo)
    // console.log('RESPONSE',res.json(newToDo));

     }catch(err){
       console.error(err);
    }
})

//       EDIT TODO

app.put('/todos/:id', async(req,res)=>{
 const { id }=req.params
 const {user_email, title , progress, date}=req.body
 console.log("THE DATE DATA CHECKING",{user_email, title , progress, date});
 try{
    const editToDo= await pool.query('UPDATE todos SET user_email = $1, title= $2, progress= $3 ,date= $4 WHERE id= $5;',
     [user_email, title , progress, date, id])
    res.json(editToDo)
 } catch(err){
    console.error(err);
 }
})
// DELETE TODO
app.delete('/todos/:id', async(req,res)=>{
    const { id }=req.params
    // const {user_email, title , progress, date}=req.body
    try{
       const deleteToDo= await pool.query('DELETE FROM todos WHERE id= $1;', [ id])
       res.json(deleteToDo)
       console.log(res.json(deleteToDo));

    } catch(err){
       console.error(err);
    }
   })

   //    SIGNUP
   
   app.post('/signup', async(req,res)=>{
       const {email,password}=req.body
       const salt= bcrypt.genSaltSync(10)
       const hashedPassword= bcrypt.hashSync(password,salt)

       try{
       const signUp= await pool.query(`INSERT INTO users (email ,hashed_password) VALUES ($1 , $2)`,[email,hashedPassword])
        const token= jwt.sign({email},'secret',{expiresIn: '1hr'})
        res.json({email,token})
    }catch(err){
        console.error(err)
        if(err){
            res.json({detail: err.detail}) 
        }
    }
})


    //    SIGNIN
     
app.post('/signin', async(req,res)=>{
    const { email, password }= req.body
    try{
     const users= await pool.query('SELECT * FROM users WHERE email = $1' ,[email])
      if(!users.rows.length){
        return res.json({detail: 'USER DOES NOT EXISTS'})
    }
    const success=await bcrypt.compare(password,users.rows[0].hashed_password)
    const token= jwt.sign({email},'secret',{expiresIn: '1hr'})
    if(success){
     res.json({'email': users.rows[0].email,token})
    }
    else{
        res.json({'detail':'LOGIN FAILED'})
    }
    }catch(err){
       console.error(err);
    }
})


app.listen(PORT, ( )=>console.log(`Server running on PORT ${PORT}`))