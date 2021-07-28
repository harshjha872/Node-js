const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
let current = Number(window.location.search.split('=')[1]) || 1;
previous.addEventListener('click', () => {
  if (current === 1) {
    previous.href = `http://localhost:3000/?page=${current}`;
    return;
  }
  current = current - 1;
  previous.href = `http://localhost:3000/?page=${current}`;
});

next.addEventListener('click', () => {
  if (current === 3) {
    next.href = `http://localhost:3000/?page=${current}`;
    return;
  }
  current = current + 1;
  next.href = `http://localhost:3000/?page=${current}`;
});
