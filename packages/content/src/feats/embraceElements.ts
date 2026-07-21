import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "embrace_elements",
	name: "Elemental Affinity",
	description: "Elemental study adds a modest charge to fire, cold, and lightning damage.",
	icon: "skills/feats/embrace_elements.png",
	category: "elemental",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 10,
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 10,
		},
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 10,
		},
	],
	attackRiders: [],
	tags: ["mage"],
});
