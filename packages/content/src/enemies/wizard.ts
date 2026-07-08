import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wizard",
	name: "Wizard",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-St-RJHnBQ5soLbo2?alt=media&token=73766717-d4b9-47a6-864e-7570896ec861",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 10,
		dexterity: 12,
		constitution: 14,
		intelligence: 16,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["sparks", "frost_arrow", "flame_arrow"],
		featIds: ["armour"],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "constitution"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
