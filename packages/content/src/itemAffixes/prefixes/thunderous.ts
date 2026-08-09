import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "thunderous",
	name: "Thunderous",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"] }],
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{ type: "damage", target: "enemy", damageType: "lightning", dice: "2d8" },
				{
					type: "modifyRoll",
					target: "enemy",
					roll: "savingThrow",
					mode: "disadvantage",
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
});
