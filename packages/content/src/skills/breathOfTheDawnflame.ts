import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "breath_of_the_dawnflame",
	name: "Breath of the Dawnflame",
	description: "Exhale sacred fire that burns with both flame and divine radiance.",
	icon: "skills/unique/breath_of_the_dawnflame.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 5,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "10d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "radiant",
			dice: "10d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
