import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_elemental",
	name: "Fire Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9R-HzyJPG_LQJmkym?alt=media&token=2a7ee4c5-a919-44f8-80e8-ca931bb2e545",
	rank: "normal",
	level: 16,
	threat: 16,
	attributes: {
		strength: 12,
		dexterity: 19,
		constitution: 18,
		intelligence: 8,
		wisdom: 12,
		charisma: 7,
	},
	combat: {
		maxHp: 154,
		armourClass: 14,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: ["acid", "crushing", "lightning", "piercing", "slashing"],
			immunities: ["fire", "poison"],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			name: "Burning Touch",
			attackBonus: 9,
			damage: {
				dice: "2d4+2",
				type: "fire",
				attribute: "dexterity",
			},
		},
		skillIds: ["double_strike", "burning_rampage"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
