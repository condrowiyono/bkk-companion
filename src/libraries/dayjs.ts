import dayjs from 'dayjs';
import idID from 'dayjs/locale/id';
import tz from 'dayjs/plugin/timezone';

dayjs.extend(tz);
dayjs.locale(idID);
dayjs.tz.setDefault('Asia/Jakarta');

export default dayjs;
