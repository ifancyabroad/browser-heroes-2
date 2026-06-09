import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "footmans_treads",
	name: "Footman's Treads",
	description: "Sturdy boots built to withstand the rigors of the battlefield.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDK8HCNK_ICHhqb-V1?alt=media&token=242591a8-6248-4a4b-b924-585a97fc9cee",
	price: 240,
	rarity: "common",
	type: "armour",
	slot: "boots",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
