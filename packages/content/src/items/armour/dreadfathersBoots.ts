import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dreadfathers_boots",
	name: "Dreadfather's Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIG0CyLGHeCq5_-8P8o?alt=media&token=e61a228c-9a06-4619-aa21-edbe62bf0c52",
	price: 1600,
	rarity: "epic",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
