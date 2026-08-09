import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "plague_bearing",
	name: "Plague-Bearing",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"] }],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: { base: 17, includeProficiency: false, bonus: 0 },
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "damageOverTime",
					target: "enemy",
					damageType: "poison",
					dice: "2d4",
					duration: { unit: "turns", value: 3 },
				},
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "multiply",
					value: 0.75,
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
});
