import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "kings_claymore",
	name: "King's Claymore",
	description:
		"The King's Claymore is a magnificent two-handed sword with a broad, gleaming blade engraved with regal symbols. Designed for powerful strikes, it offers both reach and balance. Favored by royalty and knights alike, this claymore symbolizes authority and strength on the battlefield.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86h9XqEXUwwAyrAwNF?alt=media&token=a1e8688b-98f1-4cf1-a9ac-2e0b233c56af",
	price: 880,
	rarity: "rare",
	type: "weapon",
	weaponType: "sword",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+5",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
