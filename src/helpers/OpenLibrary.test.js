import OpenLibrary from './OpenLibrary';

describe('.fetchBooks', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('resolves to an array of matching books', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        'ISBN:0123456789': { title: 'Test Title' },
        'ISBN:0123456789ABC': { title: 'Another Test Title' },
      }),
    );

    return expect(
      OpenLibrary.fetchBooks(['0123456789', '0123456789ABC']),
    ).resolves.toStrictEqual([
      { title: 'Test Title' },
      { title: 'Another Test Title' },
    ]);
  });
});
