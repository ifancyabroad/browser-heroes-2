import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "ruffians_belt",
	name: "Ruffian's Belt",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsEMSIhwdegYpPMl5V?alt=media&token=f1159e4a-5e33-4732-90fd-1bc473512a13",
	level: 1,
	price: 150,
	armourType: "misc",
	properties: [
		{
			name: "dexterity",
			type: "stat",
			value: 1,
		},
	],
	type: "belt",
});
