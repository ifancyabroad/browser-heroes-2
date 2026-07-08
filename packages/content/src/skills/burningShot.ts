import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "burning_shot",
	name: "Burning Shot",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-ZLfpyTIdcuVmZGSy?alt=media&token=68eee82d-a96d-4750-8144-5971456792f2",
	pool: "common",
	category: "attack",
	maxUses: 2,
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
							damageType: "fire",
							dice: "1d8+3",
						},
					],
				},
			],
		},
	],
	tags: [],
});
