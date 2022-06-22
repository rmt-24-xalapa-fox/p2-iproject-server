const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: product } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, product, totalPages, currentPage };
};

module.exports = getPagingData