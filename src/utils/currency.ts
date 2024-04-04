const sign = 'Rp';

export const formatCurrency = (
  value: number | string | undefined | null,
  currency = sign,
) => {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  const parsed = Number(value);

  if (isNaN(parsed)) {
    return '';
  }

  return `${currency} ${parsed.toLocaleString('id-ID')}`;
};
