import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "nightmares",
	name: "Nightmares",
	description: "Invade the enemy's mind with waking nightmares that damage and terrorise them.",
	icon: "skills/common/nightmares.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "3d10",
			requiresAttackRoll: false,
			save: {
				attribute: "wisdom",
				onSuccess: "halfDamage",
				dc: {
					base: 8,
					attribute: "wisdom",
					includeProficiency: true,
					bonus: 2,
				},
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "turns", value: 4 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
