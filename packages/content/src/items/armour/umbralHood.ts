import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_hood",
	name: "Umbral Hood",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGEluk1ENx9rTO3Nzo?alt=media&token=8660797b-7ad9-49ba-aa35-ab349e868728",
	level: 4,
	price: 1700,
	armourType: "misc",
	properties: [
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 2,
		},
		{
			name: "critChance",
			type: "auxiliaryStat",
			value: 2,
		},
		{
			name: "slashing",
			type: "damage",
			value: 40,
		},
	],
	characterClass: "-OI76C9UljPe-6hnDUcP",
	type: "helmet",
});
