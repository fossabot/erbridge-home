import PropTypes from 'prop-types';
import React, { Component } from 'react';

import OpenLibrary from '../helpers/OpenLibrary';

import Book from './Book';

class BookCollection extends Component {
  static propTypes = {
    isbns: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  state = {
    books: [],
  };

  async fetchBooks() {
    const { isbns } = this.props;

    this.setState({ books: [] });
    this.setState({ books: await OpenLibrary.fetchBooks(isbns) });
  }

  async componentDidMount() {
    await this.fetchBooks();
  }

  async componentDidUdpate(prevProps) {
    const oldIsbns = prevProps.isbns;
    const newIsbns = this.props.isbns;

    if (
      newIsbns.length !== oldIsbns.length ||
      newIsbns.some((isbn, i) => isbn !== oldIsbns[i])
    ) {
      await this.fetchBooks();
    }
  }

  render() {
    const { books } = this.state;

    return (
      <div className="BookCollection">
        {books.map(book => (
          <Book key={book.identifiers.openlibrary} {...book} />
        ))}
      </div>
    );
  }
}

export default BookCollection;
