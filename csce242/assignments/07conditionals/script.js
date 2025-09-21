//  IDs 
const toggleBtn = document.getElementById('toggle');
const arrow = document.getElementById('arrow');
const menu = document.getElementById('menu');
const goEx1 = document.getElementById('go-ex1');
const goEx2 = document.getElementById('go-ex2');
const planting = document.getElementById('planting');
const clock = document.getElementById('clock');
const days = document.getElementById('days');
const daysText = document.getElementById('days-text');
const plantMsg = document.getElementById('plant-msg');
const plantEmoji = document.getElementById('plant-emoji');
const timeBox = document.getElementById('time');

//  Menu Toggle (small screens) 
const toggleMenu = () => {
  const open = menu.classList.toggle('show');
  arrow.textContent = open ? '▴' : '▾';
};
toggleBtn.addEventListener('click', toggleMenu);

//  Section Switching 
const showEx1 = (e) => {
  e.preventDefault();
  planting.classList.remove('hide');
  clock.classList.add('hide');
  if (window.innerWidth < 680) toggleMenu();
};
const showEx2 = (e) => {
  e.preventDefault();
  clock.classList.remove('hide');
  planting.classList.add('hide');
  if (window.innerWidth < 680) toggleMenu();
};
goEx1.addEventListener('click', showEx1);
goEx2.addEventListener('click', showEx2);

//  Exercise 1: Planting Logic 
const updatePlant = () => {
  const d = Number(days.value);
  daysText.textContent = `It's been ${d} ${d === 1 ? 'day' : 'days'} since watering your plant`;

  if (d >= 1 && d <= 2) {
    plantMsg.textContent = "Plant's vibin' — all good 🌞";
    plantEmoji.textContent = '🌱';
  } else if (d >= 3 && d <= 5) {
    plantMsg.textContent = 'Kinda thirsty… toss it a sip 💧';
    plantEmoji.textContent = '🌿';
  } else if (d >= 6 && d <= 9) {
    plantMsg.textContent = 'Low-key struggling, water ASAP 🚨';
    plantEmoji.textContent = '🥀';
  } else {
    plantMsg.textContent = 'RIP… plant took the L 🪦';
    plantEmoji.textContent = '🪦';
  }
};
days.addEventListener('input', updatePlant);
updatePlant();

//  Exercise 2: Digital Clock 
const formatTime = (d) => {
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  const mm = m < 10 ? '0' + m : m;
  return `${h}:${mm} ${ampm}`;
};
const renderTime = () => { timeBox.textContent = formatTime(new Date()); };
renderTime();
setInterval(renderTime, 60000);
