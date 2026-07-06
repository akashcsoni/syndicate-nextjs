export const getShareUrl = (platform, url, title = "") => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  switch (platform?.toLowerCase()) {
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

    case "youtube":
      return `https://www.youtube.com/`;

    case "medium":
      return `https://medium.com/new-story?url=${encodedUrl}`;

    case "twitter":
    case "x":
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;

    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

    default:
      return "#";
  }
};
