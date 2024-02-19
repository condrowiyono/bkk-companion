const sign = 'Rp';

export const formatCurrency = (value: number | string | undefined | null) => {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  const parsed = Number(value);

  if (isNaN(parsed)) {
    return '';
  }

  return `${sign} ${parsed.toLocaleString('id-ID')}`;
};
