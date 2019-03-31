import { throws } from "assert";

const url = window.location.href
const main = document.querySelector('.main')

const showAllBtn = main.querySelector('.listAllBtn')
const showAllStudent = main.querySelector('.listAll__listAll')

const oneStudent = main.querySelector('.specific')
const oneStudentInput = document.getElementById('specific__input')
const oneStudentBtn = oneStudent.querySelector('.specific__button')
const showOneStudent = oneStudent.querySelector('.specific__respond')

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
          li.innerHTML = `"${Object.keys(student)}": "${student[Object.keys(student)]}"`
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
          if (res.status === 404)
            throw new Error('Not find.')
          else
            return res.json()
        })
        .then(data => {
          const ul = document.createElement('ul')
          ul.classList.add('respond__ul')
          ul.classList.add('ul')
          const li = document.createElement('li')
          li.classList.add('ul__li')
          li.innerHTML = `"${Object.keys(data)}": "${data[Object.keys(data)]}"`
          ul.appendChild(li)
          showOneStudent.appendChild(ul)
        })
        .catch(error => console.log(error))
    }
  })
})
