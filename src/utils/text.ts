type EmptyValue = string | number | null | undefined;
export const getFirstAndLastNames = (fullName: EmptyValue) => {
  if (!fullName) {
    return '';
  }

  const names = String(fullName).trim().split(' ');
  return `${names[0][0]}${names[names.length - 1][0]}`;
};

type FormatEmptyValueConfig = {
  fallback?: EmptyValue;
  checkZero?: boolean;
  checkNull?: boolean;
  checkUndefined?: boolean;
};

const defaultConfig: FormatEmptyValueConfig = {
  fallback: '-',
  checkZero: false,
  checkNull: true,
  checkUndefined: true,
};

export const formatEmptyValue = (value: EmptyValue, config = defaultConfig) => {
  const {fallback, checkZero, checkNull, checkUndefined} = {
    ...defaultConfig,
    ...config,
  };

  if (checkNull && value === null) {
    return fallback;
  }
  if (checkUndefined && value === undefined) {
    return fallback;
  }
  if (checkZero && value === 0) {
    return fallback;
  }

  return value;
};
