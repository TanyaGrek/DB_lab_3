const searchForm = document.querySelector('form')
const search = document.querySelector('input')
const table = document.querySelector('#event-list')
const message = document.querySelector('#message')

function drawTable(data) {
  table.innerHTML = '';

  let content = (`
    <thead>
      <tr>
        <th>Title</th>
        <th>Starts</th>
        <th>Venue</th>
        <th>City</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
  `);

  data.map(item => {
    content += `
      <tr>
        <td>${item.title}</td>
        <td>${convertDate(item.starts)}</td>
        <td>${item.venue}</td>
        <td>${item.city}</td>
        <td>
          <button data-id=${item._id} onclick={edit(this)} >Edit</button>
          <button data-id=${item._id} onclick={remove(this)}>Remove</button>
        </td>
      </tr>
          `
  });

  content += `</tbody>`;

  table.insertAdjacentHTML("beforeend", content)
}

function getData() {
  const searchValue = search.value;
  message.textContent = 'Loading...';

  fetch('http://localhost:3002/api/events?search=' + searchValue).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message.textContent = data.error;
      } else {
        message.textContent = '';
        drawTable(data);
      }
    })
  })
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  getData();
})

function convertDate(inputFormat) {
  function pad(s) {
    return (s < 10) ? '0' + s : s;
  }

  const d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

function edit(e) {
  console.log(e.dataset)
}

function remove(e) {
  const id = e.dataset.id;

  fetch('http://localhost:3002/api/events/' + id, {
    method: 'DELETE',
    mode: 'same-origin',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message.textContent = data.error
      } else {
        getData();
      }
    })
  })
}

function ready() {
  getData();
}

document.addEventListener("DOMContentLoaded", ready);