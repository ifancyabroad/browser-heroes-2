import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description:
		"The King's Claymore is a magnificent two-handed sword with a broad, gleaming blade engraved with regal symbols. Designed for powerful strikes, it offers both reach and balance. Favored by royalty and knights alike, this claymore symbolizes authority and strength on the battlefield.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86h9XqEXUwwAyrAwNF?alt=media&token=a1e8688b-98f1-4cf1-a9ac-2e0b233c56af",
	level: 3,
	max: 12,
	min: 6,
	name: "King's Claymore",
	price: 880,
	properties: [
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "sword",
	id: "kings_claymore",
});
