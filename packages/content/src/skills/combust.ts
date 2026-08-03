import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "combust",
	name: "Combust",
	description: "Overheat and erupt into a suicidal explosion that can only be partially escaped.",
	icon: "skills/unique/combust.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "self",
			damageType: "fire",
			dice: "15d12",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "15d12",
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
