import { Card } from "../../components";
import { FormCard } from "../../components/Form";
import { Header } from "../../components/Header";
import { useTask } from "../../context/TaskContext";
import styles from "./Home.module.scss";

export const Home = () => {
	const { tasks, favoriteTasks } = useTask();

	return (
		<div className={styles.Home}>
			<Header />

			<main className={styles.main}>
				<FormCard />
				<p>Favoritas</p>

				<section className={styles.cardsContainer}>
					{favoriteTasks.map((task) => (
						<Card
							key={task.id}
							id={task.id}
							title={task.title}
							is_favorite={task.is_favorite}
							color={task.color}
						>
							{task.description}
						</Card>
					))}
				</section>

				<p>Outras</p>

				<section className={styles.cardsContainer}>
					{tasks.map((task) => (
						<Card
							key={task.id}
							id={task.id}
							title={task.title}
							is_favorite={task.is_favorite}
							color={task.color}
						>
							{task.description}
						</Card>
					))}
				</section>
			</main>
		</div>
	);
};
