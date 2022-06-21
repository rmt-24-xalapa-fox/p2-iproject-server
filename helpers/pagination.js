const getPagination = (page, size) => {
  const limit = size ? +size : 9;
  const offset = page ? page * limit : 0;
  return offset;
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: books } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  const maxItemPerPage = limit;
  const itemInThisPage = books.length;
  return {
    totalItems,
    totalPages,
    currentPage,
    maxItemPerPage,
    itemInThisPage,
    books,
  };
};

module.exports = { getPagination, getPagingData };
