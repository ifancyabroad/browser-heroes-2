import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "stitched_ogre",
	name: "Stitched Ogre",
	portrait: "enemies/hills/stitched_ogre.png",
	rank: "normal",
	threat: 18,
	attributes: {
		strength: 19,
		dexterity: 16,
		constitution: 16,
		intelligence: 3,
		wisdom: 6,
		charisma: 5,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Claws",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["flurry", "expose_weakness", "shadow_strike"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
