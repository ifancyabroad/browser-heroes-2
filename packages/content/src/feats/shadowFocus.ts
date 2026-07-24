import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "shadow_focus",
	name: "Shadow Focus",
	description: "Shadow practice sharpens your aim with spells and weapons alike.",
	icon: "skills/feats/shadow_focus.png",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
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
