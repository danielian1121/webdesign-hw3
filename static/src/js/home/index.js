const main = document.querySelector('.main')
const showAllBtn = main.querySelector('.listAllBtn')
const showAllStudent = main.querySelector('.listAll__listAll')

window.addEventListener('load', () => {
  showAllBtn.addEventListener('click', () => {
    fetch(`${window.location.href}api/students`)
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
})
