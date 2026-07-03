type GetDamageMessageInput = {
	prefix: string;
	hpDamage: number;
	absorbedDamage: number;
};

export function getDamageMessage(input: GetDamageMessageInput): string {
	if (input.absorbedDamage === 0) {
		return `${input.prefix} for ${input.hpDamage} damage.`;
	}

	if (input.hpDamage === 0) {
		return `${input.prefix}, but the shield absorbs all ` + `${input.absorbedDamage} damage.`;
	}

	return (
		`${input.prefix} for ${input.hpDamage} damage ` +
		`after ${input.absorbedDamage} is absorbed by a shield.`
	);
}
