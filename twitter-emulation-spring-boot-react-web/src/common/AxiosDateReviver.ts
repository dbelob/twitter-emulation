import { AxiosResponseTransformer } from 'axios';

const dateFormatRegExp = /[+-]?\d{4}(-[01]\d(-[0-3]\d(T[0-2]\d:[0-5]\d:?([0-5]\d(\.\d+)?)?[+-][0-2]\d:[0-5]\dZ?)?)?)?/;
const dateKeyRegExp = /date/i;
const timeKeyRegExp = /time/i;

function isValidDate(date: any) {
    return date != null && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
}

/**
 * A function which evaluates whether a given key/value pair contains a date or time
 * and converts that value to a Date object if so
 * @param {string} key Key
 * @param {unknown} value Value to evaluate and revive
 * @returns {unknown | Date} the value, simply passed through if not a date, or a Date
 */
function dateReviver(key: string, value: any) {
    if ((dateKeyRegExp.test(key) || timeKeyRegExp.test(key)) && (typeof value === 'string') && dateFormatRegExp.test(value)) {
        const potentialDate = new Date(value);
        if (isValidDate(potentialDate)) {
            return potentialDate;
        }
    }
    return value;
}

function dateTransformer(data: any): AxiosResponseTransformer {
    if (data === '') {
        return JSON.parse('{}');
    } else {
        return JSON.parse(data, dateReviver);
    }
}

export default dateTransformer;
