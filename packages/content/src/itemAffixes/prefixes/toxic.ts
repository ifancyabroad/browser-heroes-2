import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "toxic",
	name: "Toxic",
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
					damageType: "poison",
					damageClass: "magical",
					dice: "1d4",
				},
			],
		},
	],
});
