const form = document.querySelector('#event-edit')
const message = document.querySelector('#message')
const venueSelect = document.querySelector('#venues')


form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(form);

  const body = {
    title: formData.get('title'),
    starts: formData.get('starts'),
    ends: formData.get('ends'),
    venue_id: formData.get('venue_id'),
  }

  fetch('http://localhost:3002/api/events', {
    method: 'POST',
    mode: 'same-origin',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message.textContent = data.error
      } else {
        formData.delete('title');
        formData.delete('starts');
        formData.delete('ends');
        formData.delete('venue_id');
      }
    })
  })
})

function ready() {
  message.textContent = 'Loading...';

  fetch('http://localhost:3002/api/venues').then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message.textContent = data.error
      } else {
        message.textContent = '';
        let content = '';

        data.map(item => {
          content += `<option value=${item._id}>${item.name}</option>`
        })

        venueSelect.insertAdjacentHTML("beforeend",content)
      }
    })
  })
}

document.addEventListener("DOMContentLoaded", ready);