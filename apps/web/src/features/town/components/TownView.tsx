import type { RunView } from "@app/shared";
import { Layout } from "../../../components/Layout";

type TownViewProps = {
	run: RunView;
};

export function TownView({ run }: TownViewProps) {
	const { state } = run;
	const { gold, hero } = state;

	return (
		<Layout>
			<h1>Town</h1>

			<p>{hero.name}</p>
			<p>Level {hero.level}</p>
			<p>
				HP: {hero.currentHp} / {hero.maxHp}
			</p>
			<p>Gold: {gold}</p>
			<p>Battle: {state.battleNumber}</p>

			<button type="button">Enter Combat</button>
		</Layout>
	);
}
