// const inputs = document.getElementsByTagName("input");
// [...inputs].forEach((input) => {
//   input.addEventListener("input", () => {
//     if (input.value.trim() === "") {
//       input.classList.remove("placeholder-on");
//     } else {
//       input.classList.add("placeholder-on");
//     }
//   });
// });

// {
//   id: string | number,
//   title: string,
//   author: string,
//   year: number,
//   isComplete: boolean,
// }

const insertForm = document.querySelector("#insert-book form");
const titleInput = insertForm.querySelector("#title");
const authorInput = insertForm.querySelector("#author");
const yearInput = insertForm.querySelector("#year");
const isCompletedInput = insertForm.querySelector("#already-read");
const listBook = document.querySelector("#list-book");
const incompletedList = listBook.querySelector(".incompleted-list .books");
const completedList = listBook.querySelector(".completed-list .books");

// Init
document.addEventListener("DOMContentLoaded", () => {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  renderBook();
  // console.log(books);
});

// Insert Form
// Insert Form Test
titleInput.value = "Pemrograman Berorientasi Objek dengan PHP";
authorInput.value = "Muhammad Sumbul";
yearInput.value = "2021";
isCompletedInput.checked = true;

// Calling The Functions
insertForm.addEventListener("submit", insertBook);

// Functions
// Insert Function
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
    year: yearInput.value,
    isCompleted: isCompletedInput.checked,
  };
  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
  isCompletedInput.checked = false;
  const existingBooks = JSON.parse(localStorage.getItem("books")) || [];
  existingBooks.push(book);
  localStorage.setItem("books", JSON.stringify(existingBooks));
  renderBook();
  showToast("Book inserted!");
}

// Render Function
function renderBook() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const incompletedBooks = books.filter((book) => !book.isCompleted);
  const completedBooks = books.filter((book) => book.isCompleted);
  incompletedList.innerHTML = "";
  completedList.innerHTML = "";
  if (incompletedBooks.length <= 0) {
    incompletedList.innerHTML = `<div class="book message">No incompleted books. Please add or mark a book!</div>`;
  }
  if (completedBooks.length <= 0) {
    completedList.innerHTML = `<div class="book message">No completed books. Please add or mark a book!</div>`;
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
        <span class="button delete-button">
          <span class="material-symbols-outlined">delete</span>
        </span>
        <span class="button action-button">
          <span class="material-symbols-outlined" onclick="updateBook(${
            book.id
          })">${book.isCompleted ? "close" : "done"}</span>
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

// Update Function
// function updateBook(bookId) {
//   const books = JSON.parse(localStorage.getItem("books"));
//   alert(bookId);
// }

// Toast Function
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
