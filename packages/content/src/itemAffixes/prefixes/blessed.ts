import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "blessed",
	name: "Blessed",
	position: "prefix",
	rarity: "uncommon",
	weight: 0.5,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 1,
		},
	],
});
