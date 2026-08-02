import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "will_of_the_deceiver",
	name: "WIll of the Deceiver",
	description: "Wrap yourself in an impenetrable deception that halves all incoming damage.",
	icon: "skills/unique/will_of_the_deceiver.png",
	pool: "unique",
	kind: "spell",
	category: "defensive",
	maxUses: 2,
	effects: [
		{
			type: "modifyDamageTaken",
			target: "self",
			operation: "multiply",
			value: 0.5,
			durationTurns: 4,
		},
	],
	tags: [],
});
