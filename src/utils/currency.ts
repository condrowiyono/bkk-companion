const sign = 'Rp';

export const formatCurrency = (value: number | string | undefined | null) => {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  // try to parse the value to number
  const parsed = Number(value);

  if (isNaN(parsed)) {
    return '';
  }

  return `${sign} ${parsed.toLocaleString('id-ID')}`;
};
