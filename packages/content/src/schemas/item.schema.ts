import { z } from "zod";
import { armourSchema, type Armour, type ArmourInput } from "./armour.schema";
import { weaponSchema, type Weapon, type WeaponInput } from "./weapon.schema";

export const itemSchema = z.union([armourSchema, weaponSchema]);

export type ItemDefinition = Armour | Weapon;
export type ItemDefinitionInput = ArmourInput | WeaponInput;
