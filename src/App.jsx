import { TodoProvider } from "./context/TodoContext";
import TodoPage from "./pages/TodoPage";

const App = () => {
  return (
    <TodoProvider>
      <TodoPage />
    </TodoProvider>
  );
};

export default App;
