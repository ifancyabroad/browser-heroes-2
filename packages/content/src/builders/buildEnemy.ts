import type { IEnemy } from "../types/enemy";
import { EnemySchema } from "../schemas/enemy.schema";

export const buildEnemy = (enemy: IEnemy) => {
	const parsed = EnemySchema.parse(enemy);
	return parsed;
};

export default buildEnemy;
