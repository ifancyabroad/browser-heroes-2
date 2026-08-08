import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "boots_of_insulation",
	name: "Boots of Insulation",
	description: "Insulated boots that ward against bitter cold and violent storms.",
	icon: "items/armour/boots/Boots_31.png",
	price: 3200,
	rarity: "legendary",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "cold",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "lightning",
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 4,
		},
	],
	tags: [],
});
