import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "mind_charm",
	name: "Mind Charm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsDX863VWFx8eWvLKy?alt=media&token=7bf26af6-7c2e-47aa-b190-ccbd62d27c83",
	level: 1,
	price: 120,
	armourType: "misc",
	properties: [
		{
			name: "intelligence",
			type: "stat",
			value: 1,
		},
	],
	type: "amulet",
});
