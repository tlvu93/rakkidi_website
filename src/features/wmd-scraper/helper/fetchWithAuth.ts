export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = sessionStorage.getItem('authToken');
  const headers = token
    ? { ...options.headers, Authorization: `Bearer ${token}` }
    : options.headers;

  const response = await fetch(url, { ...options, headers });
  return response.json();
};
