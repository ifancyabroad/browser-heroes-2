import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "lost_protector",
	name: "Lost Protector",
	description:
		"An armoured warrior who still guards the approaches to a deserted stronghold. The insignia beneath his weathered armour belongs to a garrison absent from surviving island records.",
	portrait: "enemies/island/lost_protector.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 16,
		dexterity: 12,
		constitution: 14,
		intelligence: 8,
		wisdom: 12,
		charisma: 8,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Fine Falchion",
			icon: "items/weapons/swords/Sword_11.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6+1",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["wind_strike", "armour_break"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "wisdom"],
	},
	encounter: {
		zone: "island",
		weight: 1,
	},
	tags: [],
});
