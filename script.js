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

// Init
document.addEventListener("DOMContentLoaded", () => {
  console.log(JSON.parse(localStorage.getItem("books")));
});

// Insert Form
const insertForm = document.querySelector("#insert-book form");
const titleInput = insertForm.querySelector("#title");
const authorInput = insertForm.querySelector("#author");
const yearInput = insertForm.querySelector("#year");
const isCompletedInput = insertForm.querySelector("#already-read");

// Insert Form Test
titleInput.value = "Pemrograman Berorientasi Objek dengan PHP";
authorInput.value = "Muhammad Sumbul";
yearInput.value = "2021";
isCompletedInput.checked = true;

insertForm.addEventListener("submit", (event) => {
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

  const pushAbleBooks = JSON.parse(localStorage.getItem("books")) || [];
  pushAbleBooks.push(book);
  localStorage.setItem("books", JSON.stringify(pushAbleBooks));
  console.log(JSON.parse(localStorage.getItem("books")));

  event.preventDefault();
  showToast("Insert");
});

// Functions
function showToast(action) {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
