import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cursing_bolt",
	name: "Cursing Bolt",
	description:
		"Fire a bolt of necrotic energy that deals damage and hinders the enemy's saving throws.",
	icon: "skills/warlock/cursing_bolt.png",
	pool: "warlock",
	category: "spell",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "1d10+5",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "savingThrow",
			mode: "disadvantage",
			durationTurns: 4,
		},
	],
	tags: [],
});
