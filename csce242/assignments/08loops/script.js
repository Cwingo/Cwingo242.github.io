//  SELECTORS 
const scene = document.getElementById('scene');
const drawBtn = document.getElementById('drawBtn');
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');
const clouds = [
  document.getElementById('cloud1'),
  document.getElementById('cloud2'),
  document.getElementById('cloud3'),
  document.getElementById('cloud4'),
  document.getElementById('cloud5'),
  document.getElementById('cloud6'),
];
const trees = [
  document.getElementById('tree1'),
  document.getElementById('tree2'),
  document.getElementById('tree3'),
  document.getElementById('tree4'),
  document.getElementById('tree5'),
  document.getElementById('tree6'),
];

//  LAYOUT WITH LOOPS 
const layoutScene = () => {
  const w = scene.clientWidth;
  const gap = w / 7;

  for (let i = 0; i < clouds.length; i++) {
    const x = Math.round(gap * (i + 0.6));
    const y = 78 + (i % 2 === 0 ? 0 : 12);
    clouds[i].style.left = `${x - 70}px`;
    clouds[i].style.top  = `${y}px`;
  }

  for (let i = 0; i < trees.length; i++) {
    const x = Math.round(gap * (i + 0.55));
    trees[i].style.left = `${x - 30}px`;
  }
};

//  DAY/NIGHT TOGGLE 
const setDayNight = () => {
  const hour = new Date().getHours();
  const isNight = (hour >= 18 || hour < 6);
  scene.classList.toggle('night', isNight);
  sun.style.display  = isNight ? 'none' : 'block';
  moon.style.display = isNight ? 'block' : 'none';
};

//  EVENTS 
const drawScene = () => {
  layoutScene();
  setDayNight();
};

drawBtn.addEventListener('click', () => drawScene());
window.addEventListener('resize', () => layoutScene());
