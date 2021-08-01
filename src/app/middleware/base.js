class General {
	getDaysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
	}

	getLocalTime() {
		const localTime = new Date(Date.now());
		let localSecond = localTime.getSeconds();
		let localMilliSecond = localTime.getMilliseconds();
		let localMinutes = localTime.getMinutes();
		let localHours = localTime.getHours();
		let localDate = localTime.getDate();
		let localMonth = localTime.getMonth() + 1;
		let localYear = localTime.getFullYear();
		let localDayOfWeek;

		if (localTime.getDay() === 0) {
			localDayOfWeek = "CN";
		} else {
			localDayOfWeek = `T${localTime.getDay() + 1}`;
		}

		return `${localHours}:${localMinutes}:${localSecond}:${localMilliSecond} - ${localDayOfWeek} ${localDate}/${localMonth}/${localYear} GMT+7`;
	}
}

export default new General();
