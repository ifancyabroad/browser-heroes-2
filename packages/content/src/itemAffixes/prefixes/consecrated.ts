import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "consecrated",
	name: "Consecrated",
	position: "prefix",
	rarity: "rare",
	weight: 0.75,
	appliesTo: [{ itemTypes: ["weapon"] }],
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{ type: "damage", target: "enemy", damageType: "radiant", dice: "1d6" },
				{ type: "shield", target: "self", amount: 4, durationTurns: 2 },
			],
		},
	],
});
