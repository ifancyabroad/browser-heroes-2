import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "sunburst",
	name: "Sunburst",
	description: "Unleash overwhelming sunlight that sears the enemy and may leave them blinded.",
	icon: "skills/cleric/sunburst.png",
	pool: "cleric",
	kind: "prayer",
	category: "damage",
	rarity: "legendary",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "radiant",
			damageClass: "magical",
			dice: "8d6",
			attribute: "wisdom",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "wisdom" },
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "turns", value: 4 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
