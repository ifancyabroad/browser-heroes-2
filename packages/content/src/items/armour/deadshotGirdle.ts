import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deadshot_girdle",
	name: "Deadshot Girdle",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIMPKDv9aHS9uxfLL12?alt=media&token=0267963d-df3a-4419-9bcc-cdc01490b2c8",
	level: 4,
	price: 1320,
	armourType: "misc",
	properties: [
		{
			name: "piercing",
			type: "damage",
			value: 40,
		},
		{
			name: "hitChance",
			type: "auxiliaryStat",
			value: 4,
		},
	],
	type: "belt",
});
