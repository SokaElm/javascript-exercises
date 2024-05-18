class Book {
  constructor({ title, author, pagesNumber, isRead }) {
    this.title = title;
    this.author = author;
    this.pagesNumber = pagesNumber;
    this.isRead = isRead;
  }

  get id() {
    return this.title.split(" ").join("").toLowerCase();
  }

  info() {
    let readInfo;
    if (this.isRead === "yes") {
      readInfo = "read";
    } else {
      readInfo = "not read yet";
    }
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pagesNumber +
      " pages, " +
      readInfo
    );
  }

  toggleReadStatus() {
    if (this.isRead === "yes") {
      this.isRead = "no";
    } else {
      this.isRead = "yes";
    }
  }
}

class Library {
  constructor({ array }) {
    this.library = array;
  }

  addBookToLibrary(title, author, pagesNumber, isRead) {
    let newBook = new Book({ title, author, pagesNumber, isRead });
    this.library.push(newBook);
  }

  getBookById(event) {
    const targetCell = event.target
      .closest("tr")
      .querySelector("td:first-child");
    if (!targetCell) return -1;
    let bookID = targetCell.textContent.split(" ").join("").toLowerCase();

    return this.library.findIndex(function (book) {
      return book.id === bookID;
    });
  }
}

class UI {
  constructor() {
    this.showButton = document.querySelector("#showDialog");
    this.addBook = document.querySelector("#addBook");
    this.outputBox = document.querySelector("output");
    this.confirmBtn = this.addBook.querySelector("#addBtn");
    this.bookTitle = this.addBook.querySelector("#book_title");
    this.bookAuthor = this.addBook.querySelector("#book_author");
    this.bookPages = this.addBook.querySelector("#book_pages");
    this.isRead = this.addBook.querySelector("select");
    this.tableContainer = document.querySelector("#tableContainer");
    this.myLibrary = new Library({ array: [] });

    this.showButton.addEventListener("click", () => {
      this.addBook.showModal();
    });

    this.addBook.addEventListener("close", (e) => {
      this.addBook.close();
    });

    this.confirmBtn.addEventListener("click", (event) => {
      event.preventDefault();

      this.myLibrary.addBookToLibrary(
        this.bookTitle.value,
        this.bookAuthor.value,
        this.bookPages.value,
        this.isRead.value
      );
      this.addBook.close();

      document.getElementById("dialogReturnMessage").innerText =
        "Here is Your Library:";

      this.generateTable(this.myLibrary.library);
    });

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("removeBtn")) {
        let index = this.myLibrary.getBookById(event);
        if (index === -1) return;

        event.target.parentNode.parentNode.remove();
        this.myLibrary.library.splice(index, 1);
      } else if (event.target.classList.contains("updateBtn")) {
        let index = this.myLibrary.getBookById(event);
        if (index === -1) return;
        let bookToUpdate = this.myLibrary.library[index];
        bookToUpdate.toggleReadStatus();
        this.generateTable(this.myLibrary.library);
      }
    });
  }

  generateTable(myLibrary) {
    this.tableContainer.innerHTML = "";

    myLibrary.forEach((item, index) => {
      const row = document.createElement("tr");
      row.classList.add("ligne" + index);

      for (let key in item) {
        const cell = document.createElement("td");
        cell.textContent = item[key];
        row.appendChild(cell);
      }

      this.tableContainer.appendChild(row);
    });
    this.generateUpdateButton(myLibrary);
    this.generateRemoveButton(myLibrary);
  }

  generateRemoveButton(myLibrary) {
    myLibrary.forEach((item, index) => {
      const row = document.querySelector(".ligne" + index);
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove Book";
      removeBtn.classList.add("removeBtn");
      const cell = document.createElement("td");
      cell.appendChild(removeBtn);
      row.appendChild(cell);
    });
  }

  generateUpdateButton(myLibrary) {
    myLibrary.forEach(function (item) {
      const row = document.querySelector(".ligne" + myLibrary.indexOf(item));
      const updateBtn = document.createElement("button");
      updateBtn.textContent = "Mark as Read Book";
      updateBtn.classList.add("updateBtn");
      const cell = document.createElement("td");
      cell.appendChild(updateBtn);
      row.appendChild(cell);
    });
  }
}

const ui = new UI();
