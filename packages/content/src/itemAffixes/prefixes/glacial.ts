import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "glacial",
	name: "Glacial",
	position: "prefix",
	rarity: "uncommon",
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 1,
		},
	],
});
