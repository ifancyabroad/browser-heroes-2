export function Stat(props: { label: string; value: string | number; detail: string }) {
	return (
		<article className="stat">
			<span>{props.label}</span>
			<strong>{props.value}</strong>
			<small>{props.detail}</small>
		</article>
	);
}
