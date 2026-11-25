import { buildConsumable } from "../builders/buildConsumable";

export default buildConsumable({
	id: "speedPotion",
	name: "Potion of Speed",
	description: "Act first from the next round until the end of this battle.",
	icon: "consumables/Alchemy_24_energy_potion.png",
	basePrice: 30,
	maxCarry: 2,
	effect: {
		type: "applyStatus",
		target: "self",
		statusId: "haste",
		duration: { unit: "battles", value: 1 },
	},
});
