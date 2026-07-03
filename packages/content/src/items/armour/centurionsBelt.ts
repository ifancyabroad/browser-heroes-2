import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_belt",
	name: "Centurion's Belt",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGGxaNZsFNqbgQ1NTB?alt=media&token=828ebbcf-69fa-428c-9775-f425f351c2f2",
	price: 1600,
	rarity: "common",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
	],
	tags: [],
});
