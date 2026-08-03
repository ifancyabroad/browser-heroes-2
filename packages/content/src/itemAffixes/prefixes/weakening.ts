import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "weakening",
	name: "Weakening",
	position: "prefix",
	rarity: "rare",
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["dagger", "staff", "wand"],
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: {
					base: 12,
					attribute: "constitution",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "add",
					value: -1,
					durationTurns: 2,
				},
			],
		},
	],
});
