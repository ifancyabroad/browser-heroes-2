import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "will_of_the_deceiver",
	name: "WIll of the Deceiver",
	description:
		"Wrap yourself in an impenetrable deception that misdirects the next attack and halves incoming damage.",
	icon: "skills/unique/will_of_the_deceiver.png",
	pool: "unique",
	kind: "spell",
	category: "defensive",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "automaticFailure",
			charges: 1,
			duration: { unit: "turns", value: 4 },
		},
		{
			type: "modifyDamageTaken",
			target: "self",
			operation: "multiply",
			value: 0.5,
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
