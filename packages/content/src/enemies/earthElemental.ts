import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "earth_elemental",
	name: "Earth Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9R9WELrlP_t9usp1Q?alt=media&token=b107eb8c-6272-43d7-80d3-b6fa6b1ba0d8",
	rank: "normal",
	level: 17,
	threat: 17,
	attributes: {
		strength: 22,
		dexterity: 8,
		constitution: 20,
		intelligence: 6,
		wisdom: 12,
		charisma: 5,
	},
	combat: {
		hitDice: "17d8+103",
		armourClass: 18,
		proficiencyBonus: 6,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "fire", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["lightning"],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "earthquake", "obliterate"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
