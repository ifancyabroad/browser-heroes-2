import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "nullifying",
	name: "Nullifying",
	position: "prefix",
	rarity: "epic",
	weight: 0.75,
	appliesTo: {
		itemTypes: ["weapon"],
	},
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{
					type: "modifyDamageAffinity",
					target: "enemy",
					affinity: "resistance",
					operation: "remove",
					damageType: "fire",
					durationTurns: 2,
				},
			],
		},
	],
});
