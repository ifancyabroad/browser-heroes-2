import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "health_charm",
	name: "Health Charm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsIblfA-f9wC2IECtw?alt=media&token=db750ac1-1764-4e14-a95f-cfded7aeaaf4",
	level: 1,
	price: 120,
	armourType: "misc",
	properties: [
		{
			name: "constitution",
			type: "stat",
			value: 1,
		},
	],
	type: "ring",
});
