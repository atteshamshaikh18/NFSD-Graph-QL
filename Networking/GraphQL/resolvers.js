const data = {
  authors: [
    { id: "1", name: "Armaan", bookIds: ["101,102"] },
    { id: "2", name: "Habib", bookIds: ["103"] },
  ],

  books: [
    {
      id: "101",
      title: "40 Rules of love",
      publishedYear: 2000,
      authorId: "1",
    },
    { id: "102", title: "Wolf Royale", publishedYear: 2008, authorId: "1" },
    { id: "103", title: "My name is khan", publishedYear: 2012, authorId: "2" },
  ],
};

const resolvers = {
  Book: {
    author: (parent, args, context, info) => {
      return data.authors.find(
        (authorDetail) => authorDetail.id === parent.authorId,
      );
    },
  },

  Author: {
    books: (parent, args, context, info) => {
      return data.books.filter((data) => parent.bookIds.includes(data.id));
    },
  },
  Query: {
    authors: () => {
      return data.authors;
    },

    books: () => {
      return data.books;
    },
  },

  Mutation: {
    addBook: (parent, args, context, info) => {
      const newBook = { ...args, id: data.books.length + 1 };
      data.books.push(newBook);
      return newBook;
    },
  },
};

export default resolvers;
