import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "night_reaver",
	name: "Night Reaver",
	description:
		"An undead executioner who hunts the citadel's passages with a hooked blade. Prisoners once feared the scrape of its weapon more than the wardens' bells.",
	portrait: "enemies/citadel/night_reaver.png",
	rank: "normal",
	threat: 21,
	attributes: {
		strength: 14,
		dexterity: 18,
		constitution: 16,
		intelligence: 8,
		wisdom: 10,
		charisma: 8,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 17,
		damageAffinities: {
			resistances: ["acid", "cold", "fire", "lightning", "necrotic", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["crushing"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Exceptional Hooked Blade",
			icon: "items/weapons/swords/Sword_v2_03.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6+3",
				type: "slashing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["shadow_strike", "double_strike", "shadowmeld"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "citadel",
		weight: 1,
	},
	tags: [],
});
