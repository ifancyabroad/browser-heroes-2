import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "knaves_robe",
	name: "Knave's Robe",
	description: "The Knave's robe, tailored for subtle moves and shadowy maneuvers.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nm2HibRx3V8P1isPlRf?alt=media&token=c2a47714-bbab-46bc-ad63-e2f258216b0e",
	price: 60,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 10,
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
	],
	tags: [],
});
