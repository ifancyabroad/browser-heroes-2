import type { IEnemy } from "../types/enemy";
import { enemySchema } from "../schemas/enemy.schema";

export const buildEnemy = (enemy: IEnemy) => {
	const parsed = enemySchema.parse(enemy);
	return parsed;
};

export default buildEnemy;
