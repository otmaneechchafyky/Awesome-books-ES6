import Book from './modules/book.js';
import select from './modules/select.js';
import displayTime from './modules/displayTime.js';

class BooksList {
  constructor() {
    this.books = [];
  }

  AddBook(title, author) {
    if (title === '') {
      document.getElementById('empty-title').textContent = 'Please, Add the book title!';
      setTimeout(
        () => {
          document.getElementById('empty-title').textContent = '';
        }, 3000,
      );
    } else if (author === '') {
      document.getElementById('empty-author').textContent = 'Please, Add the name of the author!';
      setTimeout(
        () => {
          document.getElementById('empty-author').textContent = '';
        }, 3000,
      );
    } else {
      const newBook = new Book(title, author);
      this.books.push(newBook);
      document.querySelector('.success-before').textContent = 'Your Books is Added successfully';
      document.querySelector('.success-before').classList.add('success-after');
      setTimeout(
        () => {
          document.querySelector('.success-before').textContent = '';
          document.querySelector('.success-before').classList.remove('success-after');
        }, 3000,
      );
    }
  }

  // method to Remove an existing book in the Array
  RemoveBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  // Show books method
  ShowBooks() {
    const container = document.querySelector('.books');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Update books
    this.books.forEach((book) => {
      // Create articles Container
      const bookInfo = document.createElement('div');
      bookInfo.classList.add('book-info');
      bookInfo.innerHTML = `<p><span class="book-title">"${book.title}"</span> by <span class="book-author"> ${book.author}</span></p>`;

      // Create the Remove button
      const button = document.createElement('button');
      button.className = 'remove-book';
      button.type = 'button';
      button.textContent = 'Remove';

      // Set the book ID as a data attribute
      button.dataset.id = book.id;

      bookInfo.appendChild(button);

      // Add eventListener to remove button
      button.addEventListener('click', (event) => {
        const { id } = event.target.dataset;
        this.RemoveBook(id);
        this.ShowBooks();
      });

      container.appendChild(bookInfo);
    });

    // Update local storage
    this.StoreBooks();
  }

  StoreBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  GetBooks() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  Magic() {
    this.GetBooks();
    this.ShowBooks();

    // Add eventListner to the add button new book
    const addBookBtn = document.querySelector('#add-book');
    const form = document.getElementById('form');
    addBookBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const title = document.querySelector('#new-title').value;
      const author = document.querySelector('#new-author').value;
      this.AddBook(title, author);
      this.ShowBooks();
      form.reset();
    });
  }
}

const booksList = new BooksList();
booksList.Magic();

select();
displayTime();
