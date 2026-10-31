import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "elf_kingsguard",
	name: "Elf Kingsguard",
	description:
		"An armoured defender sworn to protect the royal household. Each bears a shield passed down by a predecessor whose name remains inscribed beneath the straps.",
	portrait: "enemies/grove/elf_kingsguard.png",
	rank: "normal",
	threat: 19,
	attributes: {
		strength: 16,
		dexterity: 18,
		constitution: 16,
		intelligence: 12,
		wisdom: 14,
		charisma: 12,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 20,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Superior Scimitar",
			icon: "items/weapons/swords/Sword_v2_01.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6+2",
				type: "slashing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["dawn_strike", "shield_wall", "shield_bash"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "grove",
		weight: 1,
	},
	tags: [],
});
