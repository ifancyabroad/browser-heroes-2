import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "transcendent",
	name: "Transcendent",
	position: "prefix",
	rarity: "epic",
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
			value: 2,
		},
		{
			type: "modifyDamage",
			damageClass: "magical",
			operation: "add",
			value: 2,
		},
	],
});
