export type DatePreset = 7 | 30 | 90 | "custom";

export function utcDate(offsetDays = 0): string {
	const date = new Date();
	date.setUTCHours(0, 0, 0, 0);
	date.setUTCDate(date.getUTCDate() + offsetDays);
	return date.toISOString().slice(0, 10);
}

export function presetRange(days: 7 | 30 | 90) {
	return { from: utcDate(-(days - 1)), to: utcDate() };
}

export function shortDate(value: string): string {
	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		timeZone: "UTC",
	}).format(new Date(`${value}T00:00:00.000Z`));
}
