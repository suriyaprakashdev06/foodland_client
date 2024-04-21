import React, { useState } from 'react'

const TodoList = () => {
  const [todo,setTodo] = useState('')
  const [data,setData] = useState([])

  const handleChange = (e) => {
    setTodo(e.target.value);
  }
  const addTodo = () => {
    setData(oldArray => [...oldArray, todo])
    setTodo('')
  }
  const deleteList = (index) => {
    console.log("index",index);
  }
  console.log("data",data);
  return (
    <div className='h-full w-full flex items-center justify-center'>
    <div className='w-96 h-[500px] flex items-center rounded-3xl flex-col bg-gray-300'>
      <h1 className='text-2xl'>Todo List :</h1>
      <div className='pb-5'>
        <input value={todo} onChange={(e)=>handleChange(e)} type='text' className='border-2 border-red-500 ' />
        <button onClick={addTodo} className='border-2 border-black '>Add Me</button>
      </div>
      {
        data.map((data,index)=>(
          <div key={index} className='w-64 flex justify-between'>
            <span>{index+1}.</span>
            <span>{data}</span>
            <button onClick={()=>deleteList(index)} className={`border-2 border-black`}>Delete</button>
          </div>

        ))
      }
    </div>
    </div>
  )
}

export default TodoList
