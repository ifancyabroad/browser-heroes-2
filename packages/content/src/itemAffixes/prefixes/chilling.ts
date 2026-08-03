import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "chilling",
	name: "Chilling",
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
					type: "modifyStat",
					target: "enemy",
					stat: "attackRollBonus",
					value: -1,
					durationTurns: 2,
				},
			],
		},
	],
});
