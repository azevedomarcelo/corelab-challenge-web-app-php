import { useState } from "react";
import Cancel from "../../assets/icons/close.svg";
import Logo from "../../assets/logo.png";
import Search from "../Search";
import styles from "./Header.module.scss";
export function Header() {
	const [search, setSearch] = useState<string>("");

	return (
		<header className={styles.Header}>
			<div className={styles.content}>
				<img src={Logo} alt="Imagem logo" />
				<p>CoreNotes</p>
				<Search
					placeholder="Pesquisar notas"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			<button type="button">
				<img src={Cancel} alt="fechar" />
			</button>
		</header>
	);
}
