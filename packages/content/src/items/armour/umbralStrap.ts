import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_strap",
	name: "Umbral Strap",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGERwsU6BqmW1DQnAA?alt=media&token=1825aa8d-fdbb-4d11-8e1f-e371d55db013",
	price: 1600,
	rarity: "epic",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
