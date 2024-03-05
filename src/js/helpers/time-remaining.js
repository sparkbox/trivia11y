const TIME_IS_UP = 'Time is up!';

const formatTimeRemaining = (timeInSeconds) => {
	const minutes = Math.floor(timeInSeconds / 60);
	const seconds = Math.floor(timeInSeconds) % 60;

	return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds} remaining`;
};

const getTimeRemaining = () => {
	const endTimeString = sessionStorage.getItem('endTime');
	if (!endTimeString) {
		return null;
	}

	const endTime = Number.parseInt(endTimeString, 10);
	const now = new Date().getTime();

	const timeRemainingInSeconds = (endTime - now) / 1000;
	if (timeRemainingInSeconds < 0) {
		return TIME_IS_UP;
	}

	return formatTimeRemaining(timeRemainingInSeconds);
};

const updateTimeRemaining = () => {
	const timeRemaining = getTimeRemaining();
	const timeRemainingElement = document.querySelector('[data-time-remaining]');
	if (timeRemainingElement) {
		timeRemainingElement.textContent = timeRemaining;

		if (timeRemaining !== TIME_IS_UP) {
			requestAnimationFrame(updateTimeRemaining);
		}
	}
};

export const initializeTimer = () => {
	const timeRemaining = getTimeRemaining();
	if (timeRemaining == null) {
		return;
	}

	requestAnimationFrame(updateTimeRemaining);
};
