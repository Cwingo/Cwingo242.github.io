/* # Class */
function Car(o){
    this.name = o.name;
    this.artist = o.artist;
    this.artistUrl = o.artistUrl;
    this.image = o.image;
    this.framed = o.framed === true;
  }
  
  /* # Card Section (title + image) */
  Car.prototype.getSection = function(i){
    var card = document.createElement('section');
    card.className = 'card';
    card.tabIndex = 0;
    card.dataset.index = i;
  
    var h = document.createElement('h3');
    h.textContent = this.name;
  
    var wrap = document.createElement('div');
    wrap.className = 'thumb-wrap';
  
    var img = document.createElement('img');
    img.className = 'thumb';
    img.src = this.image;
    img.alt = this.name + ' thumbnail';
  
    wrap.appendChild(img);
    card.appendChild(h);
    card.appendChild(wrap);
    return card;
  };
  
  /* # Data */
  var cars = [
    new Car({
      name:'BMW M3 Competition',
      artist:'BMW M3',
      artistUrl:'https://www.caranddriver.com/bmw/m3',
      image:'images/m3.png',
      framed:true
    }),
    new Car({
      name:'Porsche 911 Turbo S',
      artist:'Porsche',
      artistUrl:'https://maxtondesign.com/product-eng-22087-Set-of-Splitters-Porsche-911-Turbo-S-992.html?srsltid=AfmBOoqsfLl9WGBPINOHOX_3MuSikCAHBuUXLs95i8DLoU-0RRr0FiPJ',
      image:'images/911.png',
      framed:false
    }),
    new Car({
      name:'Nissan GT-R',
      artist:'Nissan',
      artistUrl:'https://www.nissanoforangepark.com/nissan-gt-r-trim-levels-info/?srsltid=AfmBOoqoKXpdGmW3elxFoH9fVWP66hlPR8h5SHt7GvOJDi_ylYx1aEdH',
      image:'images/gtr.png',
      framed:true
    }),
    new Car({
      name:'Lamborghini Huracán',
      artist:' Lamborghini',
      artistUrl:'https://exoticcars.ae/blog/posts/29/the-lamborghini-huracan-sto',
      image:'images/lambo.png',
      framed:false
    }),
    new Car({
      name:'Audi RS6 Avant',
      artist:'Audi ',
      artistUrl:'https://news.dupontregistry.com/for-sale/audi-abt-rs6r-avant-somo/',
      image:'images/r6.png',
      framed:true
    })
  ];
  
  /* # Build */
  var gallery = document.getElementById('gallery');
  for (var i = 0; i < cars.length; i++){
    gallery.appendChild(cars[i].getSection(i));
  }
  
  /* # Modal Refs */
  var modal = document.getElementById('artModal');
  var modalClose = document.getElementById('modalClose');
  var mTitle = document.getElementById('mTitle');
  var mArtist = document.getElementById('mArtist');
  var mImage = document.getElementById('mImage');
  var mImageWrap = document.getElementById('mImageWrap');
  var mFrameNote = document.getElementById('mFrameNote');
  
  /* # Open Modal */
  function openModal(index){
    var p = cars[index];
    mTitle.textContent = p.name;
  
    mArtist.innerHTML = '';
    var link = document.createElement('a');
    link.href = p.artistUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = p.artist;
    mArtist.appendChild(link);
  
    mImage.src = p.image;
    mImage.alt = p.name + ' full image';
  
    if (p.framed){
      mImageWrap.className = 'modal-image-wrap frame';
      mFrameNote.textContent = 'Framed photo';
    } else {
      mImageWrap.className = 'modal-image-wrap';
      mFrameNote.textContent = 'Unframed photo';
    }
    modal.style.display = 'block';
  }
  
  /* # Close Modal */
  function closeModal(){ modal.style.display = 'none'; }
  
  /* # Events */
  gallery.addEventListener('click', function(e){
    var card = e.target.closest('.card');
    if (!card) return;
    openModal(parseInt(card.dataset.index, 10));
  });
  gallery.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' '){
      var card = e.target.closest('.card');
      if (!card) return;
      e.preventDefault();
      openModal(parseInt(card.dataset.index, 10));
    }
  });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e){ if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
  });
  