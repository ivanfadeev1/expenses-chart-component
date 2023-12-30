import data from './data.js';

const counterElements = document.querySelectorAll('.counter');
const animationSpeed = 200;

counterElements.forEach(counterElement => {
    animateCounter(counterElement, animationSpeed);
});

function animateCounter(counterElement, animationSpeed) {
    const animate = () => {
        const value = +counterElement.dataset.value;
        const data = +counterElement.textContent;

        const time = value / animationSpeed;

        if (data < value) {
            counterElement.textContent = +((data + time).toFixed(2));
            setTimeout(animate, 1);
        } else {
            counterElement.textContent = value;
        }
    };

    animate();
}

const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const currentDayIndex = new Date().getDay();

const pixelData = culcPixelHeight(data, 150);
const barItems = document.querySelectorAll('.chart__spending-list-item');

for (const barItem of barItems) {
    const [bar, subtitle] = barItem.children;

    bar.style.height = pixelData.find(e => e.day === subtitle.textContent).amount;

    bar.classList.toggle('chart__spending-list-item-bar--today', subtitle.textContent === days[currentDayIndex]);
}

function culcPixelHeight(arr, fullHeight) {
    const maxValue = Math.max( ...arr.map(e => e.amount) );
    const pixelPercent = fullHeight / 100;

    return arr.map(e => ({
        day: e.day,
        amount: `${Math.round(e.amount / maxValue * 100 * pixelPercent)}px`
    }));
}