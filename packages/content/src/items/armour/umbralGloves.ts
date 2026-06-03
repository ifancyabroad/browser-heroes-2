import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_gloves",
	name: "Umbral Gloves",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGEDX0cqOgxh3Iznhz?alt=media&token=27c193a3-5613-4669-9424-ba8779e33b32",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "poison",
			type: "damage",
			value: 40,
		},
		{
			name: "poison",
			type: "resistance",
			value: 40,
		},
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
	],
	characterClass: "-OI76C9UljPe-6hnDUcP",
	type: "gloves",
});
