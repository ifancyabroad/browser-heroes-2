import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "hawkeyed",
	name: "Hawkeyed",
	position: "prefix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["bow", "crossbow"],
			attackRanges: ["ranged"],
			damageClasses: ["physical"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 1,
		},
		{
			type: "modifyDamage",
			attackRange: "ranged",
			operation: "add",
			value: 1,
		},
	],
});
