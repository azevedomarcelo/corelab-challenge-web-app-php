import { type ChangeEvent, useRef, useState } from "react";

import favoriteIconFilled from "../../assets/icons/favorite-filled.svg";
import favoriteIcon from "../../assets/icons/favorite.svg";
import { useTask } from "../../context/TaskContext";
import { api } from "../../lib/api";
import type { Task } from "../../types/Task";
import styles from "./Form.module.scss";

export const FormCard = () => {
	const { loadTasks } = useTask();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isFavorite, setIsFavorite] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData: Omit<Task, "id"> = {
			color: "#FFFFFF",
			is_favorite: isFavorite,
			title,
			description,
		};

		try {
			await api.post("/tasks", formData);
			await loadTasks();

			setTitle("");
			setDescription("");
			setIsFavorite(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.taskForm}>
			<div>
				<input
					type="text"
					name="title"
					placeholder="Titulo"
					value={title}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setTitle(e.target.value)
					}
					className={styles.formTitle}
					required
				/>

				<button type="button" onClick={() => setIsFavorite(!isFavorite)}>
					{isFavorite ? (
						<img src={favoriteIconFilled} alt="Icone favorito preenchido" />
					) : (
						<img src={favoriteIcon} alt="Icone favorito" />
					)}
				</button>
			</div>

			<textarea
				ref={textareaRef}
				name="description"
				placeholder="Criar nota..."
				value={description}
				onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
					setDescription(e.target.value)
				}
				onKeyDown={handleKeyDown}
				required
				className={styles.formDescription}
			/>
		</form>
	);
};
