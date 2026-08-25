import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "permafrost",
	name: "Permafrost",
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
					damageType: "cold",
					damageClass: "magical",
					dice: "1d8",
				},
			],
		},
	],
});
