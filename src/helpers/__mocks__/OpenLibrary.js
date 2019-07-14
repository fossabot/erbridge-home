class OpenLibrary {
  static async fetchBooks(isbns) {
    return isbns.map(isbn => ({
      identifiers: {
        openlibrary: `OL${isbn}`,
        isbn_10: isbn.length === 10 ? isbn : undefined,
        isbn_13: isbn.length === 13 ? isbn : undefined,
      },
      title: `Title for ${isbn}`,
      subtitle: `Subtitle for ${isbn}`,
      authors: [
        { name: `Author A for ${isbn}` },
        { name: `Author B for ${isbn}` },
      ],
      url: `http://example.com/${isbn}`,
    }));
  }
}

export default OpenLibrary;
