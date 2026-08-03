import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "charged",
	name: "Charged",
	position: "prefix",
	rarity: "uncommon",
	weight: 0.5,
	appliesTo: [
		{
			itemTypes: ["weapon", "armour"],
		},
	],
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 1,
		},
	],
});
