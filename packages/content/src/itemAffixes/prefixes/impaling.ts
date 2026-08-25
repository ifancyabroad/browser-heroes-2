import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "impaling",
	name: "Impaling",
	position: "prefix",
	rarity: "rare",
	weight: 0.75,
	appliesTo: [{ itemTypes: ["weapon"], damageTypes: ["piercing"] }],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					damageClass: "physical",
					dice: "1d6",
				},
			],
		},
	],
});
