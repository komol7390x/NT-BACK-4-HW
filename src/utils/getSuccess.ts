export const getSuccessRes = (
  data: object,
  statusCode: number = 200,
) => {
  return {
    statusCode,
    message: 'success',
    data,
  };
};