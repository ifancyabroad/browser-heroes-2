import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bucket_knight",
	name: "Bucket Knight",
	description:
		"A stranded swordsman protected by armour assembled from salvaged equipment. Islanders recognise mainland military markings on pieces that clearly belonged to several different owners.",
	portrait: "enemies/island/bucket_knight.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 14,
		dexterity: 10,
		constitution: 14,
		intelligence: 8,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 17,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Fine Longsword",
			icon: "items/weapons/swords/Sword_02.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+1",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["taunt", "heavy_strike"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength"],
	},
	encounter: {
		zone: "island",
		weight: 1,
	},
	tags: [],
});
