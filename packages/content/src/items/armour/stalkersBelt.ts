import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "stalkers_belt",
	name: "Stalker's Belt",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsVkaMfnIx5IBFwYX2?alt=media&token=d8de60b9-6cd0-40f2-b074-ec928b52b54d",
	level: 2,
	price: 280,
	armourType: "misc",
	properties: [
		{
			name: "critChance",
			type: "auxiliaryStat",
			value: 2,
		},
	],
	type: "belt",
});
