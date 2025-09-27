import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function App() {
  // to add todo
  const [todo, setTodo] = useState("")

  // to Hold todos
  const [todos, setTodos] = useState([])

  const [isEditing, setIsEditing] = useState(false);
  
  const [showFinished, setshowFinished] = useState(true)




  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
        
    }
  }, [])
  

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }



  
  const handleAdd = () => {
    setTodos([...todos,{id:uuidv4(), todo, isCompleted:false}])
    setTodo("")
    console.log(todos);
    saveTodos()
    
  }
  const handleEdit = (e, id) => {
   let t  =  todos.filter((todo) => todo.id === id)
  //  setTodo(t[0].todo)
   setTodos((prev) => prev.filter((todo) => todo.id !== id))
   setIsEditing(true);
   saveTodos()
  }
    const handleSave = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    setIsEditing(false); 
    saveTodos()
  };
    

  const handleDelete = (e, id) => {
    if (window.confirm("Are you sure your want to delete")) {
      
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
      console.log(id);
      saveTodos()
    }
    
    
  }
  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id)
    let newTodos = [...todos]
    newTodos[index].isCompleted  = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveTodos()
  }

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto mx-3 my-5 rounded-xl p-5  bg-violet-100 min-h-[80vh] md:w-1/2">
          <h2 className="text-lg font-bold ">Add a Todo</h2>
        <div className="addTodo my-4 flex">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            
            className="w-full rounded-lg"
          />
          <button
             onClick={isEditing ? handleSave : handleAdd}
             disabled = {todo.length <= 3}
            className="bg-violet-800 hover:bg-violet-950 px-3 py-1 text-sm font-bold text-white  mx-6 disabled:bg-slate-950 rounded-lg"
            
          >
          {isEditing ? "Save" : "Add"}
            
          </button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show showFinished
        <h2 className="text-xl font-bold">Todos</h2>
        <div className="todos pt-2">
          {todos.length === 0 && <div className='m-'>Empty todo </div>}
          {todos.map((item,index) => (
            (showFinished || !item.isCompleted) &&
            <div key={index} className="todo flex pt-4  md:w-1/2 justify-between">
              <div className='flex gap-4'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id='' />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              
              <div className="buttons flex h-full">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="bg-violet-800 hover:bg-violet-950 px-3 py-1 text-sm font-bold text-white rounded-md mx-1"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => handleDelete(e,item.id)}
                  className="bg-violet-800 hover:bg-violet-950 px-3 py-1 text-sm font-bold text-white rounded-md mx-1"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App
