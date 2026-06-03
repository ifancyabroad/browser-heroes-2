import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "silent_band",
	name: "Silent Band",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAs_ZwZ_NDvoc8sS4fX?alt=media&token=673137db-1ba6-40ce-963a-ec1c397d9b9b",
	level: 2,
	price: 320,
	armourType: "misc",
	properties: [
		{
			name: "critChance",
			type: "auxiliaryStat",
			value: 2,
		},
	],
	type: "ring",
});
