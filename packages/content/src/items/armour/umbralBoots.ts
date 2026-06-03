import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_boots",
	name: "Umbral Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGE1M-NztOpxLhP65m?alt=media&token=e1a3d7b8-9758-43e7-b227-292728cbae49",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
		{
			name: "necrotic",
			type: "damage",
			value: 40,
		},
		{
			name: "necrotic",
			type: "resistance",
			value: 40,
		},
	],
	characterClass: "-OI76C9UljPe-6hnDUcP",
	type: "boots",
});
