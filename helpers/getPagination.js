const getPagination = (page, size) => {
  const limit = size ? +size : 16;
  const offset = page > 1 ? (page-1) * limit : 0;
  return { limit, offset };
};

module.exports = getPagination