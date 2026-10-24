import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "mystic",
	name: "Mystic",
	position: "prefix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["staff", "wand"],
			damageTypes: ["radiant", "necrotic"],
			damageClasses: ["magical"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
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
