import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "natures_wrath",
	name: "Nature's Wrath",
	description:
		"Nature's Wrath is a beautifully crafted staff adorned with twisting vines and vibrant leaves. It channels the power of the natural world, allowing the wielder to summon roots and vines to ensnare foes. Favored by druids, this staff embodies the raw fury and beauty of nature in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86iXwrc1ccOlbTldxs?alt=media&token=f44cf246-c5e0-4528-a975-511505ea84f6",
	price: 240,
	rarity: "uncommon",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+1",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "acid",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "acid",
		},
	],
	attackRiders: [],
	tags: [],
});
