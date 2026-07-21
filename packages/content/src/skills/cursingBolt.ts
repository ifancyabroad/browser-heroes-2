import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cursing_bolt",
	name: "Cursing Bolt",
	description:
		"Fire a bolt of necrotic energy that deals damage and may curse your enemy, forcing them to fail any saving throws.",
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
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.75,
			durationTurns: 4,
		},
	],
	tags: [],
});
