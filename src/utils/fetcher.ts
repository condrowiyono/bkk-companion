const BASE_URL = 'https://mataair-api.orbitallabs.net';

const constructUrl = (path: string) => {
  if (path.startsWith('http')) {
    return path;
  }

  const url = new URL(path, BASE_URL);
  return url.toString();
};

export const fetcher = async <T extends unknown>(
  url: string,
  options?: RequestInit,
) => {
  const res = await fetch(constructUrl(url), options);
  if (!res.ok) {
    throw new Error('Terjadi kesalahan');
  }
  return res.json() as Promise<T>;
};
