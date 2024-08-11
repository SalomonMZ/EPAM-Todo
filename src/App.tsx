import Header from "./components/Header";
import TodoList from "./components/Todos/TodoList";

function App() {
  return (
    <>
      <Header />
      <div className="w-full mt-10 flex items-center justify-center">
        <TodoList />
      </div>
    </>
  );
}

export default App;
