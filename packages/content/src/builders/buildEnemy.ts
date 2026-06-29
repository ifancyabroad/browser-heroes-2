import type { EnemyDefinition, EnemyDefinitionInput } from "../schemas/enemy.schema";
import { enemySchema } from "../schemas/enemy.schema";

export const buildEnemy = (enemy: EnemyDefinitionInput): EnemyDefinition => {
	const parsed = enemySchema.parse(enemy);
	return parsed;
};

export default buildEnemy;
