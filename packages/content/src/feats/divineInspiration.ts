import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "divine_inspiration",
	name: "Divine Inspiration",
	description: "Blessed purpose steadies body and spirit.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTXdELX-HExDeZ8y6L?alt=media&token=b51b7b94-f31d-4c63-8282-a5c8adc911a1",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 1,
		},
	],
	attackRiders: [],
	tags: ["cleric"],
});
