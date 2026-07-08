import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "spook",
	name: "Spook",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9Fao6yVdkld7nZuuMv?alt=media&token=dd91773f-d1d0-4730-9dfb-cb730185be98",
	pool: "common",
	category: "spell",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "1d6",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
