import { throws } from 'assert'

const url = window.location.href
const main = document.querySelector('.main')

const showAllBtn = main.querySelector('.listAllBtn')
const showAllStudent = main.querySelector('.listAll__listAll')

const oneStudent = main.querySelector('.specific')
const oneStudentInput = document.getElementById('specific__input')
const oneStudentBtn = oneStudent.querySelector('.specific__button')
const showOneStudent = oneStudent.querySelector('.specific__respond')

const addStudent = main.querySelector('.add')
const addStudentId = document.getElementById('add__input--id')
const addStudentName = document.getElementById('add__input--name')
const addStudentBtn = addStudent.querySelector('.add__button')

const deleteStudent = main.querySelector('.delete')
const deleteStudentInput = document.getElementById('delete__input')
const deleteStudentBtn = deleteStudent.querySelector('.delete__button')

window.addEventListener('load', () => {
  showAllBtn.addEventListener('click', () => {
    fetch(`${url}api/students`)
      .then(res => res.json())
      .then(data => {
        if (showAllStudent.firstChild)
          showAllStudent.removeChild(showAllStudent.firstChild)
        const students = data.student
        const ul = document.createElement('ul')
        ul.classList.add('listAll__ul')
        ul.classList.add('ul')
        for (let student of students) {
          const li = document.createElement('li')
          li.classList.add('ul__li')
          li.innerHTML = `"${student.ID}": "${student.name}"`
          ul.appendChild(li)
        }
        showAllStudent.appendChild(ul)
      })
  })

  oneStudentBtn.addEventListener('click', () => {
    const numberId = oneStudentInput.value
    if (numberId) {
      if (showOneStudent.firstChild)
        showOneStudent.removeChild(showOneStudent.firstChild)
      fetch(`${url}api/students/${numberId}`)
        .then(res => {
          if (res.status === 404) throw new Error('Not find.')
          else return res.json()
        })
        .then(data => {
          const ul = document.createElement('ul')
          ul.classList.add('respond__ul')
          ul.classList.add('ul')
          const li = document.createElement('li')
          li.classList.add('ul__li')
          li.innerHTML = `Hello, ${data.name}`
          ul.appendChild(li)
          showOneStudent.appendChild(ul)
        })
        .catch(error => console.log(error))
    }
  })

  addStudentBtn.addEventListener('click', () => {
    if (addStudentId.value.trim() && addStudentName.value.trim()) {
      const data = {
        ID: addStudentId.value.trim(),
        name: addStudentName.value.trim()
      }
      fetch(`${url}api/students`, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          addStudentId.value = ''
          addStudentName.value = ''
        })
    }
  })

  deleteStudentBtn.addEventListener('click', () => {
    const numberId = deleteStudentInput.value
    if (numberId) {
      const data = {
        ID: numberId
      }
      fetch(`${url}api/students`, {
        body: JSON.stringify(data),
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          deleteStudentInput.value = ''
        })
    }
  })
})
