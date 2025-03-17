import { TaskContext } from "./context/TaskContext";
import { Home } from "./pages/Home/index";

function App() {
	return (
		<TaskContext>
			<Home />
		</TaskContext>
	);
}

export default App;
