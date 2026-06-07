import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_tracker",
	name: "Orc Tracker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-hCT0lQo-TZeq1pL2?alt=media&token=3000f79b-487e-473b-90a0-9cf3606dd08d",
	rank: "normal",
	level: 14,
	threat: 14,
	attributes: {
		strength: 14,
		dexterity: 18,
		constitution: 16,
		intelligence: 10,
		wisdom: 11,
		charisma: 10,
	},
	combat: {
		maxHp: 122,
		armourClass: 13,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 7,
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["multi_shot", "take_aim", "trip_wire"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
