import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "will_of_the_deceiver",
	name: "Will of the Deceiver",
	description: "Embrace the Deceiver's will to empower necrotic damage and healing.",
	icon: "skills/unique/will_of_the_deceiver.png",
	pool: "unique",
	kind: "spell",
	category: "buff",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "necrotic",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyHealing",
			target: "self",
			multiplier: 1.5,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
