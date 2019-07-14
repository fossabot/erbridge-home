class OpenLibrary {
  static async fetchBooks(isbns) {
    const isbnKeys = isbns.map(isbn => `ISBN:${isbn}`);
    const response = await fetch(
      `https://openlibrary.org/api/books?bibkeys=${isbnKeys.join(
        ',',
      )}&jscmd=data&format=json`,
    );
    const bookData = await response.json();

    return isbnKeys.map(key => bookData[key]);
  }
}

export default OpenLibrary;
