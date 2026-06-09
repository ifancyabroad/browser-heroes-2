import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "shadow_focus",
	name: "Shadow Focus",
	description: "Shadow practice sharpens your aim with spells and weapons alike.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh3v9mXEeAJhlsZfwB?alt=media&token=3ac3e157-3f26-4716-b546-4ce5f00ef032",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			operation: "add",
			value: 1,
		},
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 10,
		},
	],
	attackRiders: [],
	tags: ["warlock"],
});
