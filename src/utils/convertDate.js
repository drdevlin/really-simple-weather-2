const convertDate = (theirDate) => {
	const year = theirDate.slice(0, 4);
	const month = Number(theirDate.slice(4, 6)) - 1;
	const day = theirDate.slice(6, 8);
	const hour = theirDate.slice(8, 10);
	const minute = theirDate.slice(10);
	return new Date(Date.UTC(year, month, day, hour, minute));	
};

export default convertDate;