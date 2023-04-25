export const parseURL = (url: string) => {
  const regex = /(?<=github\.com\/)[^/]+\/[^/]+$/;
  const match = url.match(regex);
  const ownerAndRepo = match ? match[0] : '';

  return ownerAndRepo;
};

export const formatNumber = (num: number) => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(1) + 'k';
  }
};
