import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_plated_treads",
	name: "Gold Plated Treads",
	description: "These boots combine golden elegance with robust protection.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDNGm-hePKbzQpkGR_?alt=media&token=d73fa61a-2287-4f19-9b24-57730fd26df3",
	level: 3,
	price: 800,
	armourType: "misc",
	properties: [
		{
			name: "fire",
			type: "resistance",
			value: 20,
		},
		{
			name: "cold",
			type: "resistance",
			value: 20,
		},
		{
			name: "lightning",
			type: "resistance",
			value: 20,
		},
	],
	type: "boots",
});
