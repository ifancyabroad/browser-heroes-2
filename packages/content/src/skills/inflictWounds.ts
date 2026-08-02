import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "inflict_wounds",
	name: "Inflict Wounds",
	description:
		"Channel dark energy to deal necrotic damage with a chance to cause ongoing bleeding.",
	icon: "skills/occultist/inflict_wounds.png",
	pool: "occultist",
	kind: "spell",
	category: "damage",
	maxUses: 8,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "1d10",
			attribute: "wisdom",
			requiresAttackRoll: false,
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "slashing",
			dice: "1d4",
			durationTurns: 4,
		},
	],
	tags: [],
});
