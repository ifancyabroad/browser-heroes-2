import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "searing",
	name: "Searing",
	position: "prefix",
	rarity: "uncommon",
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 1,
		},
	],
});
