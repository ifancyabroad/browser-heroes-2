import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "acidic",
	name: "Acidic",
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
					damageType: "acid",
					damageClass: "magical",
					dice: "1d4",
				},
			],
		},
	],
});
