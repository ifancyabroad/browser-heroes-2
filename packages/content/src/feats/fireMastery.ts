import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "fire_mastery",
	name: "Fire Mastery",
	description: "Fire damage is multiplied by 1.25.",
	icon: "feats/Skill_FireMaster_nb.png",
	kind: "damageMastery",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "multiply",
			value: 1.25,
		},
	],
	attackRiders: [],
	tags: [],
});
