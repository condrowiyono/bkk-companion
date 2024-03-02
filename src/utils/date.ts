import dayjs, {ConfigType} from 'dayjs';

const formatDate = (date: ConfigType, format = 'DD MMMM YYYY HH:mm:ss') => {
  return dayjs(date).format(format);
};

export {formatDate};
