import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "archonic",
	name: "Archonic",
	position: "prefix",
	rarity: "epic",
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
