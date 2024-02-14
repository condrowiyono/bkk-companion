export const getFirstAndLastNames = (fullName: string) => {
  const names = fullName.trim().split(' ');
  return `${names[0][0]}${names[names.length - 1][0]}`;
};
