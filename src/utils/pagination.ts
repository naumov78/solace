export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

export const calculatePagination = (
  totalCount: number,
  page: number,
  pageSize: number
) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    page,
    pageSize,
    totalCount,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};

export const validatePaginationParams = (page: number, pageSize: number) => {
  const validatedPage = Math.max(1, Math.floor(page) || 1);
  const validatedPageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, Math.floor(pageSize) || DEFAULT_PAGE_SIZE)
  );

  return {
    page: validatedPage,
    pageSize: validatedPageSize,
  };
};

export const getOffset = (page: number, pageSize: number): number => {
  return (page - 1) * pageSize;
};
