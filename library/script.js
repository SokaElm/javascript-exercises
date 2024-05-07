const showButton = document.querySelector("#showDialog");
const addBook = document.querySelector("#addBook");
const outputBox = document.querySelector("output");
const confirmBtn = addBook.querySelector("#addBtn");
const bookTitle = addBook.querySelector("#book_title");
const bookAuthor = addBook.querySelector("#book_author");
const bookPages = addBook.querySelector("#book_pages");
const isRead = addBook.querySelector("select");
const tableContainer = document.querySelector("#tableContainer");
const myLibrary = [];

function Book(title, author, pagesNumber, isRead) {
  this.title = title;
  this.id = this.title.split(" ").join("").toLowerCase();
  this.author = author;
  this.pagesNumber = pagesNumber;
  this.isRead = isRead;
}

Book.prototype.info = function () {
  let readInfo;
  if (isRead === "yes") {
    readInfo = "read";
  } else {
    readInfo = "not read yet";
  }
  return (
    this.title +
    " by " +
    this.author +
    ", " +
    pagesNumber +
    " pages, " +
    readInfo
  );
};

Book.prototype.toggleReadStatus = function () {
  if (this.isRead === "yes") {
    this.isRead = "no";
  } else {
    this.isRead = "yes";
  }
};

function addBookToLibrary(title, author, pagesNumber, isRead) {
  let newBook = new Book(title, author, pagesNumber, isRead);
  return myLibrary.push(newBook);
}

function generateTable(library) {
  tableContainer.innerHTML = "";

  library.forEach(function (item) {
    const row = document.createElement("tr");
    row.classList.add("ligne" + library.indexOf(item));

    for (let key in item) {
      const cell = document.createElement("td");

      let isOwn = item.hasOwnProperty(key);
      if (isOwn && key !== "id") {
        cell.textContent = item[key];
        row.appendChild(cell);
      }
    }

    tableContainer.appendChild(row);
  });
  generateUpdateButton(myLibrary);
  generateRemoveButton(myLibrary);
}

function generateRemoveButton(library) {
  library.forEach(function (item) {
    const row = document.querySelector(".ligne" + library.indexOf(item));
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Book";
    removeBtn.classList.add("removeBtn");
    const cell = document.createElement("td");
    cell.appendChild(removeBtn);
    row.appendChild(cell);
  });
}

function generateUpdateButton(library) {
  library.forEach(function (item) {
    const row = document.querySelector(".ligne" + library.indexOf(item));
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Mark as Read Book";
    updateBtn.classList.add("updateBtn");
    const cell = document.createElement("td");
    cell.appendChild(updateBtn);
    row.appendChild(cell);
  });
}

showButton.addEventListener("click", () => {
  addBook.showModal();
});

addBook.addEventListener("close", (e) => {
  addBook.close();
});

addBtn.addEventListener("click", (event) => {
  event.preventDefault();

  addBookToLibrary(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    isRead.value
  );
  addBook.close();
  document.getElementById("dialogReturnMessage").innerText =
    "Here is Your Library:";

  generateTable(myLibrary);
});

document.addEventListener("click", function (event) {
  let index = getBookById(event);
  let bookToUpdate = myLibrary[index];

  if (event.target.classList.contains("removeBtn")) {
    event.target.parentNode.parentNode.remove();
    myLibrary.splice(index, 1);
  } else if (event.target.classList.contains("updateBtn")) {
    bookToUpdate.toggleReadStatus();
    generateTable(myLibrary);
  }
});

function getBookById(event) {
  let bookID = event.target.parentNode.parentNode
    .querySelector("td:first-child")
    .textContent.split(" ")
    .join("")
    .toLowerCase();

  return myLibrary.findIndex(function (book) {
    return book.id === bookID;
  });
}
