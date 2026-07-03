import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_gauntlets",
	name: "Gold Gauntlets",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsY4zxPFBJQ1ZFVHE1?alt=media&token=fdd4b434-b6b5-4fc0-9c21-97f5f253b3ae",
	price: 820,
	rarity: "common",
	type: "armour",
	slot: "gloves",
	modifiers: [
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
			damageType: "fire",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
	],
	tags: [],
});
