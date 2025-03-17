interface IButton {
	onClick: () => void;
	text: string;
}

const Button = (props: IButton) => {
	return (
		<button type="button" onClick={props.onClick}>
			{props.text}
		</button>
	);
};

export default Button;
