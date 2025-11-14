import { useState } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
  };
  const handleEdit = () => {};

  const handleDelete = (e, id) => {
    console.log(id);

    const newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    console.log(id);
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addtodo my-5">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            className="bg-white w-2/4"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 cursor-pointer hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-4"
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5">No Todos To Display </div>
          )}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex w-1/4 my-3 justify-between"
              >
                <div className="flex gap-2">
                  <input
                    name={item.id}
                    onChange={handleCheckBox}
                    type="checkbox"
                    value={item.isCompleted}
                    id=""
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                <div className="buttons">
                  <button
                    onClick={handleEdit}
                    className="bg-violet-800 cursor-pointer hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-800 cursor-pointer hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
