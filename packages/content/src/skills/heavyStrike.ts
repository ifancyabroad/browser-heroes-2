import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warrior",
	description: "Deliver a powerful blow designed to deal significant damage to a single target.",
	effects: [
		{
			multiplier: 1.5,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhgpxFRvn_sOrij-K0F?alt=media&token=92063fcb-0f0c-4f6c-aec9-4c6d205bc431",
	level: 2,
	maxUses: 4,
	name: "Heavy Strike",
	price: 0,
	id: "heavy_strike",
});
