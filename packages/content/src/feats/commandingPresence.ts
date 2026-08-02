import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "commanding_presence",
	name: "Commanding Presence",
	description: "An irresistible personality increases Charisma by 2.",
	icon: "skills/barbarian/intimidating_shout.png",
	category: "utility",
	modifiers: [{ type: "modifyStat", stat: "charisma", value: 2 }],
	attackRiders: [],
	tags: [],
});
