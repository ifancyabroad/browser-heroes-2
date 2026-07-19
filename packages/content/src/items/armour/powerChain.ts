import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "power_chain",
	name: "Power Chain",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1PVag9oTp2d8F8zd9?alt=media&token=98a60abe-0ea3-49cb-960b-3aa1896c1fb2",
	price: 1520,
	rarity: "legendary",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 4,
		},
	],
	tags: [],
});
