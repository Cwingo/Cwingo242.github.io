//  DATA 
const beforeImgs = {
    "Big Al — Alabama": "images/before/bigal.webp",
    "Uga — Georgia": "images/before/uga.webp",
    "Mike — LSU": "images/before/mike.jpg",
    "Aubie — Auburn": "images/before/auburn.jpg",
    "Smokey — Tennessee": "images/before/smokey.jpeg",
    "Cocky — South Carolina": "images/before/cocky.jpg"
  };
  
  const afterImgs = {
    "Big Al — Alabama": "images/after/al.jpg",
    "Uga — Georgia": "images/after/uga-FB.png",
    "Mike — LSU": "images/after/mikee.jpg",
    "Aubie — Auburn": "images/after/aubie.png",
    "Smokey — Tennessee": "images/after/smoky.jpg",
    "Cocky — South Carolina": "images/after/cockyy.jpg"
  };
  
  //  BUILD 
  const buildGallery = () => {
    const gallery = document.getElementById('gallery');
  
    Object.keys(beforeImgs).forEach((name) => {
      const fig = document.createElement('figure');
      fig.setAttribute('data-name', name);
  
      const img = document.createElement('img');
      img.src = beforeImgs[name];
      img.alt = name;
  
      const cap = document.createElement('figcaption');
      cap.textContent = `${name} — Go team!`;
  
      const label = document.createElement('span');
      label.textContent = name;
  
      fig.appendChild(img);
      fig.appendChild(cap);
      fig.appendChild(label);
      gallery.appendChild(fig);
    });
  };
  
  //  POPUP 
  const openPopup = (name) => {
    const popup = document.getElementById('popup');
    const title = document.getElementById('popup-title');
    const img = document.getElementById('popup-img');
  
    title.textContent = `${name} — after`;
    img.src = afterImgs[name];
    img.alt = `${name} after`;
    popup.classList.remove('hidden');
  };
  
  const closePopup = () => {
    document.getElementById('popup').classList.add('hidden');
  };
  
  //  EVENTS 
  document.addEventListener('DOMContentLoaded', () => {
    buildGallery();
  
    document.getElementById('gallery').addEventListener('click', (e) => {
      const fig = e.target.closest('figure');
      if (!fig) return;
      openPopup(fig.getAttribute('data-name'));
    });
  
    document.getElementById('close').addEventListener('click', closePopup);
    document.getElementById('popup').addEventListener('click', (e) => {
      if (e.target.id === 'popup') closePopup();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePopup();
    });
  });
  