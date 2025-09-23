//  SELECTORS 
const scene = document.getElementById('scene');
const drawBtn = document.getElementById('drawBtn');

//  HELPERS 
const make = (tag, classes = []) => {
  const el = document.createElement(tag);
  classes.forEach(c => el.classList.add(c));
  return el;
};

//  PARTS 
const sun = () => make('div', ['astr','sun']);
const moon = () => make('div', ['astr','moon']);

const cloud = (leftPx, topPx) => {
  const c = make('div', ['cloud']);
  c.style.left = `${leftPx}px`;
  c.style.top  = `${topPx}px`;
  ['p0','p1','p2','p3'].forEach(p => c.appendChild(make('div',['puff',p])));
  return c;
};

const tree = (leftPx) => {
  const t = make('div', ['tree']);
  t.style.left = `${leftPx}px`;
  t.appendChild(make('div',['trunk']));
  t.appendChild(make('div',['crown']));
  return t;
};

//  DRAW SCENE 
const drawScene = () => {
  scene.innerHTML = '';

  const hour = new Date().getHours();
  const isNight = (hour >= 18 || hour < 6);
  scene.classList.toggle('night', isNight);
  scene.appendChild(isNight ? moon() : sun());

  const w = scene.clientWidth;
  const cloudGap = w / 7;
  const treeGap  = w / 7;

  for (let i = 0; i < 6; i++) {
    const x = Math.round(cloudGap * (i + 0.6));
    const y = 78 + (i % 2 === 0 ? 0 : 12);
    scene.appendChild(cloud(x - 70, y));
  }

  for (let i = 0; i < 6; i++) {
    const x = Math.round(treeGap * (i + 0.55));
    scene.appendChild(tree(x - 30));
  }
};

//  EVENTS 
drawBtn.addEventListener('click', () => drawScene());
