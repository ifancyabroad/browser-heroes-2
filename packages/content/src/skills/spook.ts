import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "spook",
	name: "Spook",
	description:
		"Terrify the enemy with a sudden supernatural manifestation that may sap their resolve.",
	icon: "skills/common/spook.png",
	pool: "common",
	kind: "spell",
	category: "debuff",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "1d6",
			requiresAttackRoll: false,
		},
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.5,
			durationTurns: 3,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "charisma" },
			},
		},
	],
	tags: [],
});
