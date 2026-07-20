import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "weakening",
	name: "Weakening",
	position: "prefix",
	rarity: "rare",
	appliesTo: {
		itemTypes: ["weapon"],
	},
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
					type: "modifyStat",
					target: "enemy",
					stat: "strength",
					operation: "add",
					value: -2,
					durationTurns: 2,
				},
			],
		},
	],
});
