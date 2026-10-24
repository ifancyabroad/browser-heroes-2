import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "arcane",
	name: "Arcane",
	position: "prefix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["staff", "wand"],
			damageTypes: ["fire", "cold", "lightning"],
			damageClasses: ["magical"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 1,
		},
		{
			type: "modifyDamage",
			damageClass: "magical",
			operation: "add",
			value: 1,
		},
	],
});
