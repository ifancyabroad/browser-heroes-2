import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "sun_blessed",
	name: "Sun-Blessed",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"] }],
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{ type: "damage", target: "enemy", damageType: "radiant", dice: "2d6" },
				{
					type: "shield",
					target: "self",
					amount: 8,
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
});
