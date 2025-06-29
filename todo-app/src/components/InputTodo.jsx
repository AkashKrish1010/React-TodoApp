
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
const InputTodo = () => {

    const [description, setdescription] = useState("");


    const onSubmitform=async(e)=>{
        try {
            const body ={description};
            const response= await axios.post("http://localhost:5000/todos",body);

        } catch (error) {
            console.error("error");
            
            
        }

    }
    
    return (
        <div>
            <h1 className='app-name'>TODO APP</h1>
            <div className='create-todo'>
                <form onSubmit={onSubmitform}><input type='text' value={description} onChange={e=>setdescription(e.target.value)} />
                <button type='submit'>ADD</button>
                </form>

            </div></div>
    )
}

export default InputTodo