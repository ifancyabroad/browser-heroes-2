import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_crown",
	name: "Gold Crown",
	description: "This helm combines golden splendor with superior protection.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEN4ov5P7JEqbkdb4A?alt=media&token=2c43cba5-5594-44a4-baee-153c157f36f9",
	price: 1520,
	rarity: "common",
	type: "armour",
	slot: "helmet",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
