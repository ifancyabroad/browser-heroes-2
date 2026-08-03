import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "deep_freezing",
	name: "Deep-Freezing",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: { itemTypes: ["weapon"] },
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: { base: 14, attribute: "constitution", includeProficiency: false, bonus: 0 },
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "attackRollBonus",
					value: -2,
					durationTurns: 2,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "multiply",
					value: 0.85,
					durationTurns: 2,
				},
			],
		},
	],
});
