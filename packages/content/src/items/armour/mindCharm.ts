import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "mind_charm",
	name: "Mind Charm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsDX863VWFx8eWvLKy?alt=media&token=7bf26af6-7c2e-47aa-b190-ccbd62d27c83",
	price: 120,
	rarity: "common",
	type: "armour",
	slot: "amulet",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
