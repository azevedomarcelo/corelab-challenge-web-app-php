import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { api } from "../lib/api";
import type { Task } from "../types/Task";

type TaskContextProps = {
	favoriteTasks: Task[];
	tasks: Task[];
	loadTasks: () => Promise<void>;
	editColorTask: (id: number, color: string) => Promise<void>;
	deleteTask: (id: number) => Promise<void>;
};

interface TaskProps {
	children: React.ReactNode;
}

const TaskProvider = createContext({} as TaskContextProps);

const TaskContext = ({ children }: TaskProps) => {
	const [favoriteTasks, setFavoriteTasks] = useState<Task[]>([]);
	const [tasks, setTasks] = useState<Task[]>([]);

	const loadTasks = useCallback(async () => {
		await api.get<Task[]>("/tasks").then((response) => {
			const tasksResponse = response.data;
			const favoritedTasks = tasksResponse.filter((task) => task.is_favorite);
			const normalTasks = tasksResponse.filter((task) => !task.is_favorite);
			setTasks(normalTasks);
			setFavoriteTasks(favoritedTasks);
		});
	}, []);

	const editColorTask = useCallback(
		async (id: number, color: string) => {
			await api.put(`/tasks/${id}`, {
				color,
			});
			loadTasks();
		},
		[loadTasks],
	);

	const deleteTask = useCallback(
		async (id: number) => {
			await api.delete(`/tasks/${id}`);
			loadTasks();
		},
		[loadTasks],
	);

	useEffect(() => {
		loadTasks();
	}, [loadTasks]);

	return (
		<TaskProvider.Provider
			value={{ tasks, favoriteTasks, loadTasks, editColorTask, deleteTask }}
		>
			{children}
		</TaskProvider.Provider>
	);
};

const useTask = () => {
	const context = useContext(TaskProvider);
	return context;
};

export { TaskContext, TaskProvider, useTask };
