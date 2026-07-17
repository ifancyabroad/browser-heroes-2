const DATE_LENGTH = 10;

export function getTodayUtc() {
	return new Date().toISOString().slice(0, DATE_LENGTH);
}

export function addUtcDays(date: string, days: number) {
	const value = new Date(`${date}T00:00:00.000Z`);
	value.setUTCDate(value.getUTCDate() + days);
	return value.toISOString().slice(0, DATE_LENGTH);
}

export function formatDailyDate(date: string) {
	return new Intl.DateTimeFormat(undefined, {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	}).format(new Date(`${date}T00:00:00.000Z`));
}

export function formatDisplayDate(value: string) {
	return new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(new Date(value));
}
