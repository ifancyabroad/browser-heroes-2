import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "defending",
	name: "Defending",
	position: "prefix",
	rarity: "rare",
	weight: 0.75,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["mace", "spear", "shortsword", "longsword", "quarterstaff"],
		},
	],
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{
					type: "shield",
					target: "self",
					amount: 15,
					duration: {
						unit: "turns",
						value: 2,
					},
				},
			],
		},
	],
});
