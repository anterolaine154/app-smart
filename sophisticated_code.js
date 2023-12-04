/**
 * Filename: sophisticated_code.js
 * 
 * Description: This code demonstrates a sophisticated and elaborate JavaScript program
 *              that simulates a virtual library system, with support for book checkouts, returns,
 *              searching, and statistics generation.
 */

// Library class represents a virtual library
class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
    this.members = [];
    this.transactions = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(bookId) {
    const index = this.books.findIndex(book => book.id === bookId);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  addMember(member) {
    this.members.push(member);
  }

  removeMember(memberId) {
    const index = this.members.findIndex(member => member.id === memberId);
    if (index !== -1) {
      this.members.splice(index, 1);
    }
  }

  checkoutBook(bookId, memberId) {
    const bookIndex = this.books.findIndex(book => book.id === bookId);
    const memberIndex = this.members.findIndex(member => member.id === memberId);

    if (bookIndex !== -1 && memberIndex !== -1) {
      const book = this.books[bookIndex];
      const member = this.members[memberIndex];

      if (!book.isCheckedOut) {
        book.isCheckedOut = true;
        book.checkedOutBy = member;
        member.checkedOutBooks.push(book);
        this.transactions.push(`Member ${member.name} checked out book ${book.title}.`);
      } else {
        console.log(`Book ${book.title} is already checked out.`);
      }
    }
  }

  returnBook(bookId) {
    const bookIndex = this.books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      const book = this.books[bookIndex];

      if (book.isCheckedOut) {
        const member = book.checkedOutBy;

        book.isCheckedOut = false;
        book.checkedOutBy = null;
        const memberBookIndex = member.checkedOutBooks.findIndex(b => b.id === book.id);
        member.checkedOutBooks.splice(memberBookIndex, 1);
        this.transactions.push(`Member ${member.name} returned book ${book.title}.`);
      } else {
        console.log(`Book ${book.title} is already returned.`);
      }
    }
  }

  searchBooks(keyword) {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  generateStats() {
    const stats = {};

    stats.totalBooks = this.books.length;
    stats.totalMembers = this.members.length;

    let checkedOutBooksCount = 0;
    let overdueBooksCount = 0;

    for (const book of this.books) {
      if (book.isCheckedOut) {
        checkedOutBooksCount++;
        if (book.isOverdue()) {
          overdueBooksCount++;
        }
      }
    }

    stats.checkedOutBooks = checkedOutBooksCount;
    stats.overdueBooks = overdueBooksCount;

    return stats;
  }
}

// Book class represents a book in the library
class Book {
  constructor(id, title, author, publicationYear) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.isCheckedOut = false;
    this.checkedOutBy = null;
  }

  isOverdue() {
    // Logic to determine if the book is overdue
    // Implement your own logic here
    return false;
  }
}

// Member class represents a library member
class Member {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.checkedOutBooks = [];
  }
}

// Example usage of the library system
const myLibrary = new Library("My Library");

const book1 = new Book(1, "Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 1997);
const book2 = new Book(2, "To Kill a Mockingbird", "Harper Lee", 1960);
const book3 = new Book(3, "1984", "George Orwell", 1949);

const member1 = new Member(1, "John Doe", "john.doe@example.com");
const member2 = new Member(2, "Jane Smith", "jane.smith@example.com");

myLibrary.addBook(book1);
myLibrary.addBook(book2);
myLibrary.addBook(book3);

myLibrary.addMember(member1);
myLibrary.addMember(member2);

myLibrary.checkoutBook(1, 1);
myLibrary.checkoutBook(2, 2);

console.log(myLibrary.searchBooks("Potter"));
console.log(myLibrary.generateStats());

myLibrary.returnBook(1);

console.log(myLibrary.generateStats());
 