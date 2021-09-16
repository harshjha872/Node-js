const getBtn = document.getElementById('get');
const postBtn = document.getElementById('post');

getBtn.addEventListener('click', () => {
  fetch('http://localhost:8000/getdata')
    .then((res) => res.json())
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
});

postBtn.addEventListener('click', () => {
  fetch('http://localhost:8000/postreq', {
    method: 'POST',
    body: JSON.stringify({
      title: 'This is a post req',
      discription: 'This is the post req with nothing and this is discription',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
});
