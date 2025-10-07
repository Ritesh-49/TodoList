import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    const todoString = localStorage.getItem("todos")
    if (todoString) {
      setTodos(JSON.parse(todoString))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }

  const handleEdit = (id) => {
    const t = todos.find((item) => item.id === id)
    setTodo(t.todo)
    setIsEditing(true)
    setEditId(id)
  }

  const handleSave = () => {
    setTodos(todos.map(item =>
      item.id === editId ? { ...item, todo } : item
    ))
    setTodo("")
    setIsEditing(false)
    setEditId(null)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setTodos(todos.filter(item => item.id !== id))
    }
  }

  const handleChange = (e) => setTodo(e.target.value)

  const handleCheckbox = (id) => {
    setTodos(todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ))
  }

  const toggleFinished = () => setShowFinished(!showFinished)

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Add a Todo</h2>
        <form
          className="flex flex-col sm:flex-row gap-3 mb-6"
          onSubmit={e => {
            e.preventDefault()
            isEditing ? handleSave() : handleAdd()
          }}
        >
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400"
            placeholder="Enter your task..."
          />
          <button
            type="submit"
            disabled={todo.length <= 3}
            className="bg-violet-800 hover:bg-violet-950 px-6 py-2 text-sm font-bold text-white rounded-lg disabled:bg-slate-400 transition-all"
          >
            {isEditing ? "Save" : "Add"}
          </button>
        </form>
        <label className="flex items-center mb-4 gap-2">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={toggleFinished}
            className="accent-violet-800"
          />
          <span className="text-gray-700">Show Completed</span>
        </label>
        <h2 className="text-xl font-bold mb-2">Todos</h2>
        <div className="space-y-4">
          {todos.length === 0 && (
            <div className="text-center text-gray-500 py-8">No todos yet!</div>
          )}
          {todos.map((item) =>
            (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg shadow p-4"
              >
                <div className="flex items-center gap-3 w-full">
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => handleCheckbox(item.id)}
                    className="accent-violet-800"
                  />
                  <span className={`flex-1 text-lg ${item.isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {item.todo}
                  </span>
                </div>
                <div className="flex gap-2 mt-3 sm:mt-0">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-violet-800 hover:bg-violet-950 px-3 py-1 text-sm font-bold text-white rounded-md flex items-center"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-800 px-3 py-1 text-sm font-bold text-white rounded-md flex items-center"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  )
}

export default App