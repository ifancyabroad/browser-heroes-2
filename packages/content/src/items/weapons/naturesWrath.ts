import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"Nature's Wrath is a beautifully crafted staff adorned with twisting vines and vibrant leaves. It channels the power of the natural world, allowing the wielder to summon roots and vines to ensnare foes. Favored by druids, this staff embodies the raw fury and beauty of nature in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86iXwrc1ccOlbTldxs?alt=media&token=f44cf246-c5e0-4528-a975-511505ea84f6",
	level: 2,
	max: 9,
	min: 2,
	name: "Nature's Wrath",
	price: 240,
	properties: [
		{
			name: "acid",
			type: "damage",
			value: 40,
		},
		{
			name: "acid",
			type: "resistance",
			value: 40,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "natures_wrath",
});
