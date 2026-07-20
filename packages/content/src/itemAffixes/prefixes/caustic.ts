import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "caustic",
	name: "Caustic",
	position: "prefix",
	rarity: "uncommon",
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "acid",
			operation: "add",
			value: 1,
		},
	],
});
