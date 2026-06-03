import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_strap",
	name: "Umbral Strap",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGERwsU6BqmW1DQnAA?alt=media&token=1825aa8d-fdbb-4d11-8e1f-e371d55db013",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
		{
			name: "piercing",
			type: "damage",
			value: 40,
		},
	],
	characterClass: "-OI76C9UljPe-6hnDUcP",
	type: "belt",
});
