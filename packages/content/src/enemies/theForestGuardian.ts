import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_forest_guardian",
	name: "The Forest Guardian",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkcIl5L0eB39i3HIeJ?alt=media&token=7d74ca0b-c140-4b1e-a79f-aa7b639d0b86",
	rank: "boss",
	level: 13,
	threat: 13,
	attributes: {
		strength: 10,
		dexterity: 14,
		constitution: 15,
		intelligence: 6,
		wisdom: 10,
		charisma: 7,
	},
	combat: {
		hitDice: "13d12+107",
		armourClass: 11,
		proficiencyBonus: 5,
		damageAffinities: {
			resistances: ["crushing", "piercing", "slashing"],
			immunities: ["fire", "poison"],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			name: "Burning Touch",
			attackAttribute: "constitution",
			damage: {
				dice: "1d8",
				type: "fire",
				attribute: "constitution",
			},
		},
		skillIds: ["double_strike", "focus_energy", "stoke_the_flames"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
