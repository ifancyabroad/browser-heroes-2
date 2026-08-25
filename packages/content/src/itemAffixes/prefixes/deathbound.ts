import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "deathbound",
	name: "Deathbound",
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
					damageType: "necrotic",
					damageClass: "magical",
					dice: "1d8",
				},
			],
		},
	],
});
