import type { Armour, ArmourInput } from "./armour.schema";
import type { Weapon, WeaponInput } from "./weapon.schema";

export type ItemDefinition = Armour | Weapon;
export type ItemDefinitionInput = ArmourInput | WeaponInput;
