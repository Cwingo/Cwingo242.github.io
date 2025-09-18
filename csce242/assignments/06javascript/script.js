// Assignment 7 interactions (arrow functions + const/let)
document.addEventListener("DOMContentLoaded", () => {
    // Sunny Times
    const LINES = ["Here comes the sun","Sun","Sun","Sun","Here it comes"];
    const lyricsBox = document.querySelector("#lyrics");
    const sunnyCard = document.querySelector("#sunnyCard");
    let filled = false;
  
    const fillLyrics = () => {
      if (filled) return;
      LINES.forEach(t => {
        const p = document.createElement("p");
        p.textContent = t;
        lyricsBox.appendChild(p);
      });
      filled = true;
    };
    sunnyCard.addEventListener("click", fillLyrics);
  
    // Select A Color
    const picker = document.querySelector("#colorPicker");
    const preview = document.querySelector("#colorPreview");
    const codeEl = document.querySelector("#colorCode");
    const updateColor = () => {
      const hex = picker.value.toUpperCase();
      preview.style.color = hex;
      codeEl.textContent = hex;
    };
    picker.addEventListener("input", updateColor);
    updateColor();
  
    // Image Change (click the image)
    const CLOUDY_URL =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMzAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiOWQ3ZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM2ZWE3ZmYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEzMCIgY3k9IjE4MCIgcj0iNzAiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIuOTUiLz48Y2lyY2xlIGN4PSIxOTAiIGN5PSIxNzAiIHI9IjgwIiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iLjk1Ii8+PGNpcmNsZSBjeD0iMjUwIiBjeT0iMTg1IiByPSI2MCIgZmlsbD0id2hpdGUiIG9wYWNpdHk9Ii45NSIvPjxyZWN0IHk9IjI0MCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzNiNmJkNiIgb3BhY2l0eT0iLjI1Ii8+PC9zdmc+";
    const SUNNY_URL =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMzAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InMiIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM5ZGRjZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM0ZGI3ZmYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNzKSIvPjxjaXJjbGUgY3g9IjI5MCIgY3k9IjExMCIgcj0iNDYiIGZpbGw9IiNmZmQyNGEiLz48ZyBzdHJva2U9IiNmZmQyNGEiIHN0cm9rZS13aWR0aD0iNiI+PGxpbmUgeDE9IjI5MCIgeTE9IjM4IiB4Mj0iMjkwIiB5Mj0iMTIiLz48bGluZSB4MT0iMjkwIiB5MT0iMjA4IiB4Mj0iMjkwIiB5Mj0iMjMyIi8+PGxpbmUgeDE9IjIxOCIgeTE9IjExMCIgeDI9IjE5NCIgeTI9IjExMCIvPjxsaW5lIHgxPSIzNjIiIHkxPSIxMTAiIHgyPSIzODYiIHkyPSIxMTAiLz48bGluZSB4MT0iMjQ0IiB5MT0iNjQiIHgyPSIyMjYiIHkyPSI0NiIvPjxsaW5lIHgxPSIzMzYiIHkxPSIxNTYiIHgyPSIzNTQiIHkyPSIxNzQiLz48bGluZSB4MT0iMjQ0IiB5MT0iMTU2IiB4Mj0iMjI2IiB5Mj0iMTc0Ii8+PGxpbmUgeDE9IjMzNiIgeTE9IjY0IiB4Mj0iMzU0IiB5Mj0iNDYiLz48L2c+PGNpcmNsZSBjeD0iMTEwIiBjeT0iMjAwIiByPSI2OCIgc3R5bGU9ImZpbGw6I2ZmZjsgb3BhY2l0eTouOTYiLz48Y2lyY2xlIGN4PSIxNzAiIGN5PSIxOTUiIHI9Ijc4IiBzdHlsZT0iZmlsbDojZmZmOyBvcGFjaXR5Oi45NiIvPjxyZWN0IHk9IjI0MCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSI2MCIgc3R5bGU9ImZpbGw6IzJmODZlNDsgb3BhY2l0eTouMjUiLz48L3N2Zz4=";
  
    const img = document.querySelector("#weatherImg");
    let isSunny = false;
  
    const setImage = sunny => { img.src = sunny ? SUNNY_URL : CLOUDY_URL; };
    const toggleImage = () => { isSunny = !isSunny; setImage(isSunny); };
  
    img.addEventListener("click", toggleImage);
    setImage(false);
  });
  