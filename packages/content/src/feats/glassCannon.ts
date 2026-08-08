import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "glass_cannon",
	name: "Glass Cannon",
	description:
		"All outgoing damage is multiplied by 1.5, but all incoming damage is also multiplied by 1.5.",
	icon: "feats/Assassinskill_48_nobg.png",
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
