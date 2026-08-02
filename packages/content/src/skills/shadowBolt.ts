import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shadow_bolt",
	name: "Shadow Bolt",
	description: "Hurl a bolt of shadow energy at your target.",
	icon: "skills/warlock/shadow_bolt.png",
	pool: "warlock",
	category: "spell",
	maxUses: 12,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "1d10",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "attackRollBonus",
			value: -2,
			durationTurns: 1,
		},
	],
	tags: [],
});
