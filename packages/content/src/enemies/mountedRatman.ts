import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "mounted_ratman",
	name: "Mounted Ratman",
	description:
		"A ratman outrider mounted on a giant desert insect, scouting caravan routes and running down stragglers. Keeping the mount fed takes most of the spoils.",
	portrait: "enemies/desert/mounted_ratman.png",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 18,
		intelligence: 8,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Fine Spear",
			icon: "items/weapons/spears/Spear_03.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+1",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["charge", "armour_break"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
