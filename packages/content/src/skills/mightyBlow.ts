import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "mighty_blow",
	name: "Mighty Blow",
	description: "A devastating strike that delivers heavy damage with overwhelming force.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhgyQeYWKGMfv97Ojh0?alt=media&token=07293fa5-d503-491b-85a6-f683d04279bf",
	pool: "warrior",
	category: "attack",
	usage: {
		target: "enemy",
		requiresAttackRoll: true,
		maxUses: 2,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 3,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 3.75,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 4.5,
				},
			],
		},
	],
	tags: [],
});
