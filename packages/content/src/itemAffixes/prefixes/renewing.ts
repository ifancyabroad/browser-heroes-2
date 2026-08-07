import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "renewing",
	name: "Renewing",
	position: "prefix",
	rarity: "epic",
	weight: 0.75,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["mace", "staff"],
		},
	],
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{
					type: "healOverTime",
					target: "self",
					dice: "1d4",
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
});
