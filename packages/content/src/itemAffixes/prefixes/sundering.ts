import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "sundering",
	name: "Sundering",
	position: "prefix",
	rarity: "rare",
	appliesTo: {
		itemTypes: ["weapon"],
	},
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "dexterity",
				dc: {
					base: 12,
					attribute: "dexterity",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyDamageTaken",
					target: "enemy",
					operation: "multiply",
					value: 1.15,
					durationTurns: 2,
				},
			],
		},
	],
});
