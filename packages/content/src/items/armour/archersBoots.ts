import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archers_boots",
	name: "Archer's Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsWani7hbdIXmjGJ2u?alt=media&token=c5a3fe24-feb1-40d0-9cc2-ab6597213927",
	level: 2,
	price: 240,
	armourType: "misc",
	properties: [
		{
			name: "piercing",
			type: "damage",
			value: 20,
		},
	],
	type: "boots",
});
