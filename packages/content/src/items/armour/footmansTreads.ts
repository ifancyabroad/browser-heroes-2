import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "footmans_treads",
	name: "Footman's Treads",
	description: "Sturdy boots built to withstand the rigors of the battlefield.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDK8HCNK_ICHhqb-V1?alt=media&token=242591a8-6248-4a4b-b924-585a97fc9cee",
	level: 2,
	price: 240,
	armourType: "misc",
	properties: [
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
	],
	type: "boots",
});
