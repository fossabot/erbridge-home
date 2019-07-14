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

  async fetchBooks(props) {
    this.setState({ books: [] });
    this.setState({ books: await OpenLibrary.fetchBooks(props.isbns) });
  }

  async componentDidMount() {
    await this.fetchBooks(this.props);
  }

  async componentWillReceiveProps(nextProps) {
    const oldIsbns = this.props.isbns;
    const newIsbns = nextProps.isbns;

    if (
      newIsbns.length !== oldIsbns.length ||
      newIsbns.some((isbn, i) => isbn !== oldIsbns[i])
    ) {
      await this.fetchBooks(nextProps);
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
