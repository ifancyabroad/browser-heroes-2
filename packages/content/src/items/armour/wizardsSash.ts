import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "wizards_sash",
	name: "Wizard's Sash",
	description: "The Wizard's Sash, channeling mystical energy for enhanced spellcasting.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9a4lxlrxNlApNH_Qr?alt=media&token=fae14538-8000-4580-b2b7-aa556a92ce83",
	level: 1,
	price: 140,
	armourType: "misc",
	properties: [
		{
			name: "intelligence",
			type: "stat",
			value: 1,
		},
	],
	type: "belt",
});
