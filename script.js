const insertForm = document.querySelector("#insert-book form");
const titleInput = insertForm.querySelector("#title");
const authorInput = insertForm.querySelector("#author");
const yearInput = insertForm.querySelector("#year");
const isCompletedInput = insertForm.querySelector("#already-read");
const listBook = document.querySelector("#list-book");
const incompletedList = listBook.querySelector(".incompleted-list .books");
const completedList = listBook.querySelector(".completed-list .books");
const searchBar = document.querySelector("#search-bar input");

document.addEventListener("DOMContentLoaded", () => {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  renderBook(books);
});

insertForm.addEventListener("submit", insertBook);
searchBar.addEventListener("input", searchBook);

function insertBook(event) {
  event.preventDefault();
  const insertForm = document.querySelector("#insert-book form");
  const titleInput = insertForm.querySelector("#title");
  const authorInput = insertForm.querySelector("#author");
  const yearInput = insertForm.querySelector("#year");
  const isCompletedInput = insertForm.querySelector("#already-read");
  const book = {
    id: +new Date(),
    title: titleInput.value,
    author: authorInput.value,
    year: parseInt(yearInput.value),
    isCompleted: isCompletedInput.checked,
  };
  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
  isCompletedInput.checked = false;
  const existingBooks = JSON.parse(localStorage.getItem("books")) || [];
  existingBooks.push(book);
  localStorage.setItem("books", JSON.stringify(existingBooks));
  renderBook(existingBooks);
  showToast("Book inserted!");
}

function renderBook(books) {
  const incompletedBooks = books.filter((book) => !book.isCompleted);
  const completedBooks = books.filter((book) => book.isCompleted);
  incompletedList.innerHTML = "";
  completedList.innerHTML = "";
  if (incompletedBooks.length <= 0) {
    incompletedList.innerHTML = `<div class="book message">No incompleted books!</div>`;
  }
  if (completedBooks.length <= 0) {
    completedList.innerHTML = `<div class="book message">No completed books!</div>`;
  }
  books.forEach((book) => {
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book");
    bookContainer.innerHTML = `
      <div class="book-info">
        <span
          >${book.title} (${book.year})</span
        >
        <span>Author: ${book.author}</span>
      </div>
      <span class="button-wrapper">
        <span class="button cancel-button cancel-button-${
          book.id
        }" onclick="cancelDeleteBook(${
      book.id
    })" style="transform: translateX(1.625rem);">
          <span class="material-symbols-outlined">close</span>
        </span>
        <span class="button delete-button delete-button-${
          book.id
        }" onclick="comfirmDeleteBook(${book.id})">
          <span class="material-symbols-outlined">delete</span>
        </span>
        <span class="button action-button ${
          book.isCompleted ? "close-button" : ""
        }" onclick="updateBook(${book.id})">
          <span class="material-symbols-outlined">${
            book.isCompleted ? "close" : "done"
          }</span>
        </span>
      </span>
    `;
    if (book.isCompleted) {
      completedList.appendChild(bookContainer);
    } else {
      incompletedList.appendChild(bookContainer);
    }
  });
}

function updateBook(bookId) {
  const books = JSON.parse(localStorage.getItem("books"));
  const bookIndex = books.findIndex((book) => book.id === bookId);
  books[bookIndex].isCompleted = !books[bookIndex].isCompleted;
  localStorage.setItem("books", JSON.stringify(books));
  renderBook(books);
  showToast("Book updated!");
}

function comfirmDeleteBook(bookId) {
  const deleteButton = document.querySelector(`.delete-button-${bookId}`);
  const cancelButton = document.querySelector(`.cancel-button-${bookId}`);
  deleteButton.classList.add("confirm-delete");
  deleteButton.removeAttribute("onclick");
  deleteButton.setAttribute("onclick", `deleteBook(${bookId})`);
  cancelButton.style.transform = "translateX(0)";
}

function cancelDeleteBook(bookId) {
  const deleteButton = document.querySelector(`.delete-button-${bookId}`);
  const cancelButton = document.querySelector(`.cancel-button-${bookId}`);
  deleteButton.classList.remove("confirm-delete");
  deleteButton.removeAttribute("onclick");
  deleteButton.setAttribute("onclick", `comfirmDeleteBook(${bookId})`);
  cancelButton.style.transform = "translateX(1.625rem)";
}

function deleteBook(bookId) {
  const books = JSON.parse(localStorage.getItem("books"));
  const bookIndex = books.findIndex((book) => book.id === bookId);
  books.splice(bookIndex, 1);
  localStorage.setItem("books", JSON.stringify(books));
  renderBook(books);
  showToast("Book deleted!");
}

function searchBook() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const keyword = searchBar.value.toLowerCase();
  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword) ||
      book.year.toString().includes(keyword)
    );
  });
  renderBook(filteredBooks);
}

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
}
