import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    let todoString = localStorage.getItem("todos");
    return todoString ? JSON.parse(todoString) : [];
  });
  const [showFinish, setShowFinish] = useState(true);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleFinished = () => {
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
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-1/2">
        <h1 className="font-bold text-center text-xl">
          iTask - Manage your todos at one place
        </h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            className="bg-white w-full rounded-full px-5 py-1"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length < 3}
            className="bg-violet-800 cursor-pointer disabled:bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm  font-bold text-white rounded-md "
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          <input
            className="my-4"
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
                  className={"todo flex my-3 justify-between items-start w-4/4"}
                >
                  <div className="flex gap-3 items-start flex-1 min-w-0">
                    <input
                      name={item.id}
                      onChange={handleCheckBox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div
                      className={`${
                        item.isCompleted ? "line-through" : ""
                      } break-all flex-1`}
                    >
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex gap-2 shrink-0 ml-2">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 cursor-pointer hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 cursor-pointer hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-2"
                    >
                      <AiFillDelete />
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
