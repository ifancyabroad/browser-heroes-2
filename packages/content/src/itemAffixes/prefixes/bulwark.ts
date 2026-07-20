import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "bulwark",
	name: "Bulwark",
	position: "prefix",
	rarity: "rare",
	appliesTo: {
		itemTypes: ["weapon"],
	},
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{
					type: "shield",
					target: "self",
					amount: 4,
					durationTurns: 2,
				},
			],
		},
	],
});
