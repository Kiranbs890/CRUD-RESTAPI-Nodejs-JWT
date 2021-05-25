type envT = {
  development: string;
  production: string;
  test: string;
};

export const appEnv = () => {
  const env = process.env.NODE_ENV as 'development' | 'production' | 'test';
  const envType: envT = {
    development: '.env',
    production: '.env.prod',
    test: '.env.test'
  };
  return envType[env];
};

export const getPagination = (page: any, size: any) => {
  const limit = size ? +size : 2;
  const offset = page ? page * limit : 0;

  return {
    limit,
    offset
  };
};

export const getPagingData = (data: any, page: any, limit: any) => {
  const { count: totalItems, rows: towers } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    towers,
    totalPages,
    currentPage
  };
};
