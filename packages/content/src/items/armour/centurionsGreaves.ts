import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_greaves",
	name: "Centurion's Greaves",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGGef0ouMMSoDjGUdF?alt=media&token=d14ee9d5-b350-439b-9cad-1ce8c2e33fda",
	price: 1600,
	rarity: "common",
	type: "armour",
	slot: "boots",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
	],
	tags: [],
});
