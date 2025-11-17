import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinish, setShowFinish] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleFinished = (e) => {
    setShowFinish(!showFinish);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    // console.log(todos);
  };

  const handleEdit = (e, id) => {
    const user = todos.find((item) => item.id === id);
    setTodo(user.todo);

    const newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    // saveToLS();
  };

  const handleDelete = (e, id) => {
    // console.log(id);

    const newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    // saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    // console.log(id);
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    // saveToLS();
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
            disabled={todo.length < 3}
            className="bg-violet-800 cursor-pointer disabled:bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-4"
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          <input
            onClick={toggleFinished}
            type="checkbox"
            checked={showFinish}
          />{" "}
          Show Finished
          {todos.length === 0 && (
            <div className="m-5">No Todos To Display </div>
          )}
          {todos.map((item) => {
            return (
              (showFinish || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex w-1/4 my-3 justify-between"
                >
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckBox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
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
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
