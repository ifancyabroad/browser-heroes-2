import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "inflict_wounds",
	name: "Inflict Wounds",
	description: "Reach out with concentrated deathly power to inflict a grievous necrotic wound.",
	icon: "skills/occultist/inflict_wounds.png",
	pool: "occultist",
	kind: "spellAttack",
	category: "damage",
	maxUses: 8,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "2d10",
			attribute: "wisdom",
			requiresAttackRoll: true,
		},
	],
	tags: [],
});
