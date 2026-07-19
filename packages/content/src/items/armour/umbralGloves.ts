import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_gloves",
	name: "Umbral Gloves",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGEDX0cqOgxh3Iznhz?alt=media&token=27c193a3-5613-4669-9424-ba8779e33b32",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "poison",
		},
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
