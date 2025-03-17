import SearchIcon from "../../assets/icons/search.svg";
import styles from "./Search.module.scss";
interface ISearch {
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = (props: ISearch) => {
	return (
		<div className={styles.searchContainer}>
			<input
				className={styles.Search}
				type="text"
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
			/>
			<img src={SearchIcon} alt="Icone de pesquisa" />
		</div>
	);
};

export default Search;
