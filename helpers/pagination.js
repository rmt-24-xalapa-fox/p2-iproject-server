const getPagination = (page, size) => {
  const limit = size ? +size : 9;
  const offset = page ? page * limit : 0;
  return offset;
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: products } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  const maxItemPerPage = limit;
  const itemInThisPage = products.length;
  return {
    totalItems,
    totalPages,
    currentPage,
    maxItemPerPage,
    itemInThisPage,
    products,
  };
};

module.exports = { getPagination, getPagingData };
