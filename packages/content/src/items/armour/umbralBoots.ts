import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_boots",
	name: "Umbral Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGE1M-NztOpxLhP65m?alt=media&token=e1a3d7b8-9758-43e7-b227-292728cbae49",
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
			value: 2,
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
