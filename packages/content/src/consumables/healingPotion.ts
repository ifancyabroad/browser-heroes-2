import { buildConsumable } from "../builders/buildConsumable";

export default buildConsumable({
	id: "healingPotion",
	name: "Healing Potion",
	description: "Restore 50% of maximum HP, adjusted by healing modifiers.",
	basePrice: 20,
	maxCarry: 3,
	effect: {
		type: "healPercent",
		percent: 0.5,
	},
});
