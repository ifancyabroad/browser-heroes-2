import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "plague_bearing",
	name: "Plague-Bearing",
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
					type: "damageOverTime",
					target: "enemy",
					damageType: "poison",
					dice: "1d6",
					durationTurns: 3,
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
