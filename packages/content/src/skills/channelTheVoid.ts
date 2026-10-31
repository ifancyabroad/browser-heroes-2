import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "channel_the_void",
	name: "Channel the Void",
	description:
		"Increase your necrotic damage dealt and deal necrotic damage over time to the enemy and yourself.",
	icon: "skills/unique/channel_the_void.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "necrotic",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "turns", value: 6 },
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			dice: "4d6",
			duration: { unit: "turns", value: 6 },
		},
		{
			type: "damageOverTime",
			target: "self",
			damageType: "necrotic",
			damageClass: "magical",
			dice: "2d6",
			duration: { unit: "turns", value: 6 },
		},
	],
	tags: [],
});
