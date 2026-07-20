import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "barbed",
	name: "Barbed",
	position: "prefix",
	rarity: "uncommon",
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 1,
		},
	],
});
