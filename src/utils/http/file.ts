export const verifyImage = async (url?: string) => {
  try {
    if (!url) return '';
    const image = fetch(url, { method: 'HEAD' })
      .then((res) => {
        if (res.headers.get('Content-Type')?.startsWith('image')) {
          return url;
        }
        return Promise.reject();
      })
      .catch(() => '');
    return await image;
  } catch (error) {
    return '';
  }
};
