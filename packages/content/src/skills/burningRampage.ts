import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "burning_rampage",
	name: "Burning Rampage",
	description:
		"Unleash the flames within and ignite your enemies with this powerful fire attack.",
	icon: "skills/barbarian/burning_rampage.png",
	pool: "barbarian",
	category: "spell",
	maxUses: 5,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d6-1",
			attribute: "strength",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d6-1",
			attribute: "strength",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d6-1",
			attribute: "strength",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
