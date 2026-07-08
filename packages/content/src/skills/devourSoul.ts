import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "devour_soul",
	name: "Devour Soul",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC0IqVe3gyJes08fYye?alt=media&token=db556fe6-0ff7-44b9-9d74-d19d08057a0f",
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
