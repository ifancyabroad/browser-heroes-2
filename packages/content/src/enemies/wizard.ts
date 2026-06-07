import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wizard",
	name: "Wizard",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-St-RJHnBQ5soLbo2?alt=media&token=73766717-d4b9-47a6-864e-7570896ec861",
	rank: "normal",
	level: 12,
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
		maxHp: 94,
		armourClass: 10,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 4,
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["armour", "sparks", "frost_arrow", "flame_arrow"],
		featIds: [],
		tactic: "caster",
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
