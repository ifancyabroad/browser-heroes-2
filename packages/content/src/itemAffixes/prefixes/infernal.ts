import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "infernal",
	name: "Infernal",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"] }],
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
					damageType: "fire",
					dice: "1d6",
					duration: { unit: "turns", value: 3 },
				},
				{
					type: "modifyDamageTaken",
					target: "enemy",
					damageType: "fire",
					operation: "multiply",
					value: 1.2,
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
});
