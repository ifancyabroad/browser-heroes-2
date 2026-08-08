import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "disrupting",
	name: "Disrupting",
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
				attribute: "dexterity",
				dc: {
					base: 15,
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "savingThrowBonus",
					value: -2,
					duration: {
						unit: "turns",
						value: 2,
					},
				},
			],
		},
	],
});
