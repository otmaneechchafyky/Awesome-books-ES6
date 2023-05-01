export class Book {
    constructor(title, author) {
      this.id = Date.now().toString();
      this.title = title;
      this.author = author;
    }
  }