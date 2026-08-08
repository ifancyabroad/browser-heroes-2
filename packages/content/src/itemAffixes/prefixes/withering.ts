import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "withering",
	name: "Withering",
	position: "prefix",
	rarity: "rare",
	weight: 0.75,
	appliesTo: [{ itemTypes: ["weapon"] }],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "wisdom",
				dc: { base: 15, includeProficiency: false, bonus: 0 },
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyHealing",
					target: "enemy",
					multiplier: 0.5,
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
});
