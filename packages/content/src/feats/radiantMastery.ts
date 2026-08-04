import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "radiant_mastery",
	name: "Radiant Mastery",
	description: "Radiant damage is multiplied by 1.25.",
	icon: "skills/feats/Skill_HolyMagic_nb.png",
	kind: "damageMastery",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "multiply",
			value: 1.25,
		},
	],
	attackRiders: [],
	tags: [],
});
