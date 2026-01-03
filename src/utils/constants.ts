export const IMAGE_PATH = {
  poster: "https://image.tmdb.org/t/p/w500",
  backdrop: "https://image.tmdb.org/t/p/original",
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).getFullYear().toString();
};