import request from '~/api/api';

export default async function (path: string) {
  const result = request.get('/api', {
    params: {
      url: path,
      strom: 1,
    },
  });
  return result;
}
