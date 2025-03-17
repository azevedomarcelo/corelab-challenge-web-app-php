import { useState } from "react";
import closeIcon from "../../assets/icons/close.svg";
import editIcon from "../../assets/icons/edit.svg";
import favoriteIconFilled from "../../assets/icons/favorite-filled.svg";
import favoriteIcon from "../../assets/icons/favorite.svg";
import paintIcon from "../../assets/icons/paint.svg";

import { useTask } from "../../context/TaskContext";
import type { Task } from "../../types/Task";
import { COLORS } from "../../utils/colors";
import styles from "./Card.module.scss";

type ICard = Task & {
	children: React.ReactNode;
};

const Card = (props: ICard) => {
	const { editColorTask, deleteTask } = useTask();
	const [showColors, setShowColors] = useState(false);
	const [enableFields, setEnableFields] = useState(false);

	async function handleChangeColor(taskId: number, color: string) {
		await editColorTask(taskId, color);
		setShowColors(false);
	}

	return (
		<div className={styles.Card} style={{ backgroundColor: props.color }}>
			<div className={styles.headerCard}>
				{enableFields ? (
					<input type="text" value={props.title} />
				) : (
					<h2>{props.title}</h2>
				)}

				{!props.is_favorite ? (
					<img src={favoriteIcon} alt="Icone favorito" />
				) : (
					<img src={favoriteIconFilled} alt="Icone favorito preenchido" />
				)}
			</div>

			<div className={styles.content}>
				{enableFields ? <textarea>{props.children}</textarea> : props.children}
			</div>

			<footer className={styles.footerCard}>
				<div>
					<button type="button" onClick={() => setEnableFields(!enableFields)}>
						{enableFields ? (
							<span>Salvar</span>
						) : (
							<img src={editIcon} alt="Icone editar" />
						)}
					</button>

					<button type="button" onClick={() => setShowColors(!showColors)}>
						<img src={paintIcon} alt="Icone pintar" />
					</button>
				</div>
				<button type="button" onClick={() => deleteTask(props.id)}>
					<img src={closeIcon} alt="Icone deletar" />
				</button>
			</footer>
			{showColors && (
				<div className={styles.colorContainer}>
					{COLORS.map((color) => (
						<button
							type="button"
							key={color}
							style={{
								backgroundColor: color,
								width: "25px",
								height: "25px",
								borderRadius: "100px",
							}}
							onClick={() => handleChangeColor(props.id, color)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Card;
