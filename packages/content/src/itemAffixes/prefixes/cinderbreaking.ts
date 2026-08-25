import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "cinderbreaking",
	name: "Cinderbreaking",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [
		{
			itemTypes: ["weapon"],
		},
	],
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					damageClass: "magical",
					dice: "2d6",
				},
				{
					type: "modifyDamageAffinity",
					target: "enemy",
					affinity: "vulnerability",
					operation: "add",
					damageType: "fire",
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
});
