import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "corroding",
	name: "Corroding",
	position: "prefix",
	rarity: "rare",
	appliesTo: [
		{
			itemTypes: ["weapon"],
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: {
					base: 12,
					attribute: "constitution",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "damageOverTime",
					target: "enemy",
					damageType: "acid",
					dice: "1d4",
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
});
