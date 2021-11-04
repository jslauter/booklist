//Book Constructor
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

//UI Constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  //add book to list
  const list = document.getElementById('book-list')
  //create tr element
  const row = document.createElement('tr')
  //insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X<a></td>
  `
  list.appendChild(row)
}

//show alert
UI.prototype.showAlert = function (message, className) {
  //create div
  const div = document.createElement('div')
  //add classes
  div.className = `alert ${className}`
  //add text
  div.appendChild(document.createTextNode(message))
  //get parent
  const container = document.querySelector('.container')
  const form = document.querySelector('#book-form')
  container.insertBefore(div, form)
  setTimeout(function () {
    document.querySelector('.alert').remove()
  }, 3000)
}

//Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

//Clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}

//Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
  //GET FORM VALUES

  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const isbn = document.getElementById('isbn').value

  //instantiate a book
  const book = new Book(title, author, isbn)

  //instantiate UI
  const ui = new UI()

  //validate
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please, fill in fields', 'error')
  } else {
    //add book to list
    ui.addBookToList(book)

    ui.showAlert('Book Added!', 'success')

    //clear fields
    ui.clearFields()
  }

  e.preventDefault()
})

//Event Listener for Delete
document.getElementById('book-list').addEventListener('click', function (e) {
  const ui = new UI()

  ui.deleteBook(e.target)

  ui.showAlert('Book Removed!', 'success')

  e.preventDefault()
})
