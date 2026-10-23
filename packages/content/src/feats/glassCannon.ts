import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "glass_cannon",
	name: "Glass Cannon",
	description: "Increase all damage you deal, but also increase all damage you take.",
	icon: "feats/Skill_BombardShot_nb.png",
	kind: "utility",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			operation: "multiply",
			value: 1.5,
		},
		{
			type: "modifyDamageTaken",
			operation: "multiply",
			value: 1.5,
		},
	],
	attackRiders: [],
	tags: [],
});
