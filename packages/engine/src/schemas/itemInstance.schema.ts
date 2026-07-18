import { z } from "zod";
import { itemIdSchema, itemSchema } from "@app/content";

export const generatedItemDefinitionSchema = itemSchema;

export const staticItemInstanceSchema = z.object({
	instanceId: z.string().nonempty(),
	type: z.literal("static"),
	itemId: itemIdSchema,
});

export const generatedItemInstanceSchema = z.object({
	instanceId: z.string().nonempty(),
	type: z.literal("generated"),
	item: generatedItemDefinitionSchema,
});

export const itemInstanceSchema = z.discriminatedUnion("type", [
	staticItemInstanceSchema,
	generatedItemInstanceSchema,
]);

export type GeneratedItemDefinition = z.infer<typeof generatedItemDefinitionSchema>;
export type StaticItemInstance = z.infer<typeof staticItemInstanceSchema>;
export type GeneratedItemInstance = z.infer<typeof generatedItemInstanceSchema>;
export type ItemInstance = z.infer<typeof itemInstanceSchema>;
