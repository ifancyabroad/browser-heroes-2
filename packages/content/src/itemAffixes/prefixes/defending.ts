import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "defending",
	name: "Defending",
	position: "prefix",
	rarity: "rare",
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["mace", "spear", "sword"],
		},
	],
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
