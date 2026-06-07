import type { EnemyDefinition } from "../schemas/enemy.schema";
import { enemySchema } from "../schemas/enemy.schema";

export const buildEnemy = (enemy: EnemyDefinition) => {
	const parsed = enemySchema.parse(enemy);
	return parsed;
};

export default buildEnemy;
