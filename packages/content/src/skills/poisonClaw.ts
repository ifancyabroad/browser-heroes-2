import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_claw",
	name: "Poison Claw",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9eQx8AckjJR4EGe9i3?alt=media&token=30cb17bb-8570-4a33-bd25-58c19d54a370",
	pool: "common",
	category: "attack",
	maxUses: 6,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "poison",
							dice: "1d6-1",
						},
					],
				},
			],
		},
	],
	tags: [],
});
