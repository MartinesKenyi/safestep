import moment from 'moment';
import 'moment/locale/es'
moment.locale('es');

export const converDate = (date: any) => {
    if (!date) return '';

    // const beforeDate: any = new Date(date);
    const newDate: any = new Date(date);
    // const newDate = new Date(beforeDate - ((5 * 60) * 60000));

    const hourMonth = moment(newDate).format('DD-MM-YYYY | HH:mm a')
    return `${hourMonth}`
}