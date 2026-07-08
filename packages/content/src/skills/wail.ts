import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "wail",
	name: "Wail",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkZb3a3j2ykQWUtTC0?alt=media&token=068e6888-9b67-4aca-bce4-d315299e625a",
	pool: "unique",
	category: "spell",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "2d12+8",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
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
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 2,
		},
	],
	tags: [],
});
