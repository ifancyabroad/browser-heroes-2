import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "belt_of_death_protection",
	name: "Belt of Death Protection",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9dXl3iLqpcbPi2vDZ?alt=media&token=f375b628-b83c-47a8-b251-900f406b2bca",
	price: 1350,
	rarity: "common",
	type: "armour",
	slot: "belt",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "poison",
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
