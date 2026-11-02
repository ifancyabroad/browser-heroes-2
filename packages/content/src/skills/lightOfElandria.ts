import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "light_of_elandria",
	name: "Light of Elandria",
	description:
		"Deal radiant damage over time to the enemy and temporarily increase your radiant damage dealt.",
	icon: "skills/unique/light_of_elandria.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "radiant",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "turns", value: 6 },
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "radiant",
			damageClass: "magical",
			dice: "4d6",
			duration: { unit: "turns", value: 6 },
		},
	],
	tags: [],
});
