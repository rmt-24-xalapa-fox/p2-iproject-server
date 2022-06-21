const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: food } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, food, totalPages, currentPage };
};

module.exports = getPagingData