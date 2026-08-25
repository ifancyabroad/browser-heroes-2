import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "corroding",
	name: "Corroding",
	position: "prefix",
	rarity: "rare",
	weight: 0.75,
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
					base: 15,
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
					damageClass: "magical",
					dice: "2d4",
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
});
