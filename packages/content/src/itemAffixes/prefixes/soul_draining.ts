import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "soul_draining",
	name: "Soul-Draining",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"] }],
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					damageClass: "magical",
					dice: "2d6",
				},
				{ type: "heal", target: "self", dice: "1d6" },
			],
		},
	],
});
