import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "rat_ogre",
	name: "Rat Ogre",
	portrait: "enemies/desert/rat_ogre.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 18,
		dexterity: 14,
		constitution: 18,
		intelligence: 3,
		wisdom: 8,
		charisma: 6,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bone Claws",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["berserk", "heavy_strike"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
