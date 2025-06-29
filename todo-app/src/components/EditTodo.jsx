import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'

const EditTodo = () => {

  const edittodo= async (id) => {
    
    axios.put(`http://localhost:5000/todos/${id}`)
  
    
  }
  return (
    <div>EditTodo</div>
  )
}

export default EditTodo