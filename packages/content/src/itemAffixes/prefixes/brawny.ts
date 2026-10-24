import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "brawny",
	name: "Brawny",
	position: "prefix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["battleaxe", "greatclub", "greatsword", "warhammer"],
			damageClasses: ["physical"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			value: 1,
		},
		{
			type: "modifyDamage",
			damageClass: "physical",
			operation: "add",
			value: 1,
		},
	],
});
