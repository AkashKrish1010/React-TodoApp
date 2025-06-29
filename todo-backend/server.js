
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool= require("./db");
const dotenv = require("dotenv");
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

dotenv.config();

//routes
console.log(process.env.DB_PASSWORD);

//create todo
app.post("/todos", async(req,res)=>{

    try {
        const {description}=req.body;
        const newtodo= await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description])

        res.json(newtodo);
        
    } catch (error) {
        console.log(error.message);
        
    }

})



//get all todo

app.get("/todos",async (req,res) => {
    try {

        const alltodos= await pool.query("SELECT * FROM todo")
        res.json(alltodos.rows);
        
    } catch (error) {
        console.log(error.message);
        
    }
    
})


//get specific todo

app.get("/todos/:id",async (req,res) => {
    try {
        const {id}= req.params;
        const todobyid = await pool.query("SELECT * FROM todo WHERE todo_id=$1",[id])
        res.json(todobyid.rows)
    } catch (error) {
        console.error("error");
        
    }
    
})

//update todo

app.put("/todos/:id",async (req,res) => {
    try {

        const {id}= req.params;
        const {description}=req.body;
        const updatetodo = await pool.query("UPDATE todo SET  description =$1 WHERE todo_id=$2",[description,id])
        res.json(`Todo id :${id} is updated` )
        
    } catch (error) {
        console.error("error");
        
        
    }
    
})


//delete a specific todo

app.delete("/todos/:id",async (req,res) => {
    try {
        const {id}=req.params;
        const deletebyid= await pool.query("DELETE FROM todo WHERE todo_id =$1",[id])
        res.json(`Todo number ${id} is deleted`)
    } catch (error) {
        console.error("error");
        
        
    }
    
})







app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
