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

const insertForm = document.querySelector("#insert-book form");
const titleInput = insertForm.querySelector("#title");
const authorInput = insertForm.querySelector("#author");
const yearInput = insertForm.querySelector("#year");
const isCompletedInput = insertForm.querySelector("#already-read");
const listBook = document.querySelector("#list-book");

// Init
document.addEventListener("DOMContentLoaded", () => {
  const books = JSON.parse(localStorage.getItem("books"));
  renderBook(books);
  console.log(books);
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
  console.log(JSON.parse(localStorage.getItem("books")));
  showToast("Book inserted!");
}

// Render Function
function renderBook(books) {
  const completedList = listBook.querySelector(".completed-list tbody");
  const incompletedList = listBook.querySelector(".incompleted-list tbody");
  completedList.innerHTML = "";
  incompletedList.innerHTML = "";
  let completedIndex = 0;
  let incompletedIndex = 0;
  books.forEach((book) => {
    const bookItem = document.createElement("tr");
    bookItem.innerHTML = `
      <td>${book.isCompleted ? ++completedIndex : ++incompletedIndex}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td>${book.isCompleted ? "Completed" : "Mark as completed"}</td>
    `;
    if (book.isCompleted) {
      completedList.appendChild(bookItem);
    } else {
      incompletedList.appendChild(bookItem);
    }
  });
}

// Toast Function
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
