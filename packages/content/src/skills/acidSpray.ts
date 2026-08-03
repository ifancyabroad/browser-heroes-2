import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_spray",
	name: "Acid Spray",
	description: "Spray corrosive acid that burns exposed flesh and may eat through armour.",
	icon: "skills/common/acid_spray.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	rarity: "uncommon",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "acid",
			dice: "3d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: {
					base: 8,
					attribute: "dexterity",
					includeProficiency: true,
					bonus: 1,
				},
			},
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -3,
			durationTurns: 4,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
