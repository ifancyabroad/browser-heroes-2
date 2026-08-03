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
				dc: { base: 12, attribute: "wisdom", includeProficiency: false, bonus: 0 },
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "add",
					value: -1,
					durationTurns: 2,
				},
			],
		},
	],
});
