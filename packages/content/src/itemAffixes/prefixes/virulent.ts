import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "virulent",
	name: "Virulent",
	position: "prefix",
	rarity: "rare",
	weight: 0.75,
	appliesTo: [{ itemTypes: ["weapon"] }],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: { base: 12, attribute: "constitution", includeProficiency: false, bonus: 0 },
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "damageOverTime",
					target: "enemy",
					damageType: "poison",
					dice: "1d4",
					duration: { unit: "turns", value: 3 },
				},
			],
		},
	],
});
