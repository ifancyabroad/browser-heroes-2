import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "yagamons_revenge",
	name: "Yagamon's Revenge",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCZHaFOopyGcTKt8Pva?alt=media&token=b85e09f9-35c8-4273-9e7b-e1d481defdfe",
	pool: "unique",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "crushing",
			operation: "add",
			value: 50,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "fire",
			operation: "add",
			value: 50,
			durationTurns: 4,
		},
	],
	tags: [],
});
