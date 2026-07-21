import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "devour_soul",
	name: "Devour Soul",
	icon: "skills/common/devour_soul.png",
	pool: "common",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "2d12+8",
			requiresAttackRoll: false,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "wisdom",
					includeProficiency: true,
					bonus: 1,
				},
			},
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "constitution",
			operation: "add",
			value: -5,
			durationTurns: 6,
		},
	],
	tags: [],
});
