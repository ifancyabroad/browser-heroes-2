import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "renewing",
	name: "Renewing",
	position: "prefix",
	rarity: "epic",
	weight: 0.75,
	appliesTo: {
		itemTypes: ["weapon"],
	},
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{
					type: "healOverTime",
					target: "self",
					dice: "1d4",
					durationTurns: 2,
				},
			],
		},
	],
});
