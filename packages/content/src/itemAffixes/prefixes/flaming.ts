import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "flaming",
	name: "Flaming",
	position: "prefix",
	rarity: "uncommon",
	weight: 1,
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
					damageType: "fire",
					damageClass: "magical",
					dice: "1d4",
				},
			],
		},
	],
});
