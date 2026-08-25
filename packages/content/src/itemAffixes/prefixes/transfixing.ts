import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "transfixing",
	name: "Transfixing",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
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
					dice: "1d8",
				},
			],
		},
	],
});
