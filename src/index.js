document.addEventListener('DOMContentLoaded', () => {

const dogsURL = 'http://localhost:3000/dogs'

const dogForm = document.querySelector('#dog-form')
const tableBody = document.querySelector('#table-body')
const submitButton = document.querySelector('#submit-button')

const getDogsFetch = () => {
  tableBody.innerHTML = ''
  fetch(`http://localhost:3000/dogs`)
  .then(res => res.json())
  .then(dogsData => putAllDogsToTable(dogsData))
}

const putAllDogsToTable = (dogsData) => {
  dogsData.forEach(putOneDogOnTable)
}

const putOneDogOnTable = (oneDog) => {
  let id = oneDog.id
  let name = oneDog.name
  let breed = oneDog.breed
  let sex = oneDog.sex
// debugger
  tableBody.innerHTML += `
  <tr><td>${name}</td><td>${breed}</td><td>${sex}</td><td><button class="edit-button" data-id="${id}" data-name="${name}" data-breed="${breed}" data-sex="${sex}">Edit</button></td></tr>
  `
}

const addEventListenerForEditButtons = () => {
  tableBody.addEventListener('click', populateFormWithDogData)
}

const populateFormWithDogData = (event) => {
  const dogForm = document.querySelector('#dog-form')

  let id = event.target.dataset.id
  let name = event.target.dataset.name
  let breed = event.target.dataset.breed
  let sex = event.target.dataset.sex

  dogForm.name.value = name
  dogForm.breed.value = breed
  dogForm.sex.value = sex
  dogForm.dataset.id = id
}

const addEventListenerToSubmitButton = () => {
  dogForm.addEventListener('submit', handleFormSubmitButtonForEdit)
}

const handleFormSubmitButtonForEdit = () => {
  event.preventDefault();
  let id = dogForm.dataset.id
  let name = dogForm.name.value
  let breed = dogForm.breed.value
  let sex = dogForm.sex.value

  fetch(`${dogsURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      id: id,
      name: name,
      breed: breed,
      sex: sex
    })
  })
  .then(res => res.json())
  .then(updatedDogData => getDogsFetch())

  dogForm.reset()
}

// CALLS
getDogsFetch();
addEventListenerForEditButtons();
addEventListenerToSubmitButton();

}) // DOMCONTENTLOADED
