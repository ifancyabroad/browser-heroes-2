import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "call_lightning",
	name: "Call Lightning",
	description:
		"Call down a violent storm that strikes immediately and continues to lash the enemy.",
	icon: "skills/occultist/call_lightning.png",
	pool: "occultist",
	kind: "spell",
	category: "damage",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			dice: "3d8",
			attribute: "wisdom",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "wisdom" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "lightning",
			dice: "1d8",
			durationTurns: 3,
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
