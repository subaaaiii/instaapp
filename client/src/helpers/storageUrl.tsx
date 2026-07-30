const apiUrl = import.meta.env.VITE_API_URL;

export const storageUrl = (path?: string | null) => {
  if (!path) return "";

  return `${apiUrl}/storage/${path}`;
};