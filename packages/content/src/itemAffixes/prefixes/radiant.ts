import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "radiant",
	name: "Radiant",
	position: "prefix",
	rarity: "uncommon",
	appliesTo: [
		{
			itemTypes: ["weapon"],
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "1d4",
				},
			],
		},
	],
});
