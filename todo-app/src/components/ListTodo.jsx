import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import InputTodo from './InputTodo';



const ListTodo = () => {

    const [todos, settodos] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editDescription, setEditDescription] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);

    const gettodos = async () => {
        try {
            const response = await axios.get("http://localhost:5000/todos");
            const jsondata = await response.data;
            settodos(jsondata);
        } catch (error) {
            console.error("error");


        }

    }
    useEffect(() => {
        gettodos();

    }, [])

    const deletetodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/todos/${id}`);
            
            
            settodos(prevTodos => prevTodos.filter(todo => todo.todo_id !== id));
    
        } catch (error) {
            console.error("Error deleting todo:", error.response ? error.response.data : error.message);
        }
    };

    const startEdit = (todo) => {
        setEditingId(todo.todo_id);
        setEditDescription(todo.description);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditingId(null);
        setEditDescription('');
    };

    const saveEdit = async () => {
        try {
            await axios.put(`http://localhost:5000/todos/${editingId}`, {
                description: editDescription
            });
            
           
            settodos(prevTodos => 
                prevTodos.map(todo => 
                    todo.todo_id === editingId 
                        ? { ...todo, description: editDescription }
                        : todo
                )
            );
            
           
            closeEditModal();
        } catch (error) {
            console.error("Error updating todo:", error.response ? error.response.data : error.message);
        }
    };

  
    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: showEditModal ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    };

    const modalStyle = {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        minWidth: '400px',
        maxWidth: '500px'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px'
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px'
    };

    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold'
    };

    const saveButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#4CAF50',
        color: 'white'
    };

    const cancelButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#f44336',
        color: 'white'
    };

    return (
        <div className='todo-structure'>
            {/* Edit Modal */}
            <div style={modalOverlayStyle} onClick={closeEditModal}>
                <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                    <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Edit Todo</h2>
                    <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Enter todo description..."
                        style={inputStyle}
                        autoFocus
                    />
                    <div style={buttonContainerStyle}>
                        <button 
                            onClick={closeEditModal}
                            style={cancelButtonStyle}
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={saveEdit}
                            style={saveButtonStyle}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            <table cellSpacing={"50px"}>
                <thead>
    
                    <tr>
                        <th><h2>Description</h2></th>
                        <th><h2>Edit</h2></th>
                        <th><h2>Delete</h2></th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <button 
                                    className='Edit' 
                                    onClick={() => startEdit(todo)}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button  className='Delete' onClick={() => deletetodo(todo.todo_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}


                </tbody>
            </table>
        </div>
    )
}

export default ListTodo