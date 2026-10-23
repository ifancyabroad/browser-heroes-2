import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "embrace_shadows",
	name: "Embrace Shadows",
	description: "Increase your necrotic damage dealt, but take slashing damage over time.",
	icon: "skills/warlock/embrace_shadows.png",
	pool: "warlock",
	kind: "spell",
	category: "buff",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "necrotic",
			operation: "multiply",
			value: 1.75,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "damageOverTime",
			target: "self",
			damageType: "slashing",
			damageClass: "physical",
			dice: "1d6",
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
