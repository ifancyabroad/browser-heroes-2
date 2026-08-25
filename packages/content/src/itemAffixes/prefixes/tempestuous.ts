import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "tempestuous",
	name: "Tempestuous",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"] }],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
					damageClass: "magical",
					dice: "1d8",
				},
			],
		},
	],
});
