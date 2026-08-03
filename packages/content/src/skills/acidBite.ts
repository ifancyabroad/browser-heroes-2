import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_bite",
	name: "Acid Bite",
	description: "Bite into the enemy and sear the wound with corrosive acid.",
	icon: "skills/common/acid_bite.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "common",
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
							damageType: "acid",
							dice: "1d4",
						},
					],
				},
			],
		},
	],
	tags: [],
});
