import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "cursed_bracers",
	name: "Cursed Bracers",
	description: "Bracers that carry a curse, bringing calamity upon the wearer.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDUyOXsz_CWrqQKtx3?alt=media&token=737405c6-b663-44bf-b747-b608006b35e6",
	price: 680,
	rarity: "common",
	type: "armour",
	slot: "gloves",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: -2,
		},
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 50,
		},
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 50,
		},
	],
	tags: [],
});
