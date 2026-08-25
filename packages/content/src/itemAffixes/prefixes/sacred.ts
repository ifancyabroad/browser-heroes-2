import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "sacred",
	name: "Sacred",
	position: "prefix",
	rarity: "rare",
	weight: 0.75,
	appliesTo: [{ itemTypes: ["weapon"] }],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					damageClass: "magical",
					dice: "1d6",
				},
			],
		},
	],
});
