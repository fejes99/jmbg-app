import regions from './regions.json';

type GenderType = 'Muški' | 'Ženski';

export interface JMBGDetails {
  isValid: boolean;
  gender: GenderType | '';
  dateOfBirth: string | null;
  region: string | null;
  error: string;
}

const minDays: number = 1;
const minMonths: number = 1;
const maxMonths: number = 12;

export const getJMBGDetails = (jmbg: string): JMBGDetails => {
  const details: JMBGDetails = {
    isValid: false,
    gender: '',
    dateOfBirth: null,
    region: null,
    error: '',
  };

  if (!isNumericString(jmbg) || jmbg.length !== 13) {
    details.error = 'Neispravan JMBG!';
    return details;
  }

  const digits: number[] = extractDigits(jmbg);

  if (digits.length !== 13) {
    details.error = 'Neispravan JMBG!';
    return details;
  }

  const [
    dayOfBirthDigit1,
    dayOfBirthDigit2,
    monthOfBirthDigit1,
    monthOfBirthDigit2,
    yearOfBirthDigit1,
    yearOfBirthDigit2,
    yearOfBirthDigit3,
    regionDigit1,
    regionDigit2,
    genderDigit1,
    genderDigit2,
    genderDigit3,
    controlDigit,
  ]: number[] = digits;

  const dayOfBirth: number = parseInt(`${dayOfBirthDigit1}${dayOfBirthDigit2}`, 10);
  const monthOfBirth: number = parseInt(`${monthOfBirthDigit1}${monthOfBirthDigit2}`, 10);
  const yearOfBirth: number = calculateBirthYear(
    yearOfBirthDigit1,
    yearOfBirthDigit2,
    yearOfBirthDigit3,
    genderDigit3
  );

  const regionCode: number = parseInt(`${regionDigit1}${regionDigit2}`, 10);
  const genderCode: number = parseInt(`${genderDigit1}${genderDigit2}${genderDigit3}`, 10);

  const isValidDateOfBirth: boolean = isValidDate(dayOfBirth, monthOfBirth, yearOfBirth);
  const region: string | null = isValidDateOfBirth ? validateRegion(regionCode) : null;

  if (!isValidDateOfBirth || !region) {
    details.error = 'Neispravan JMBG!';
    return details;
  }

  const gender: GenderType = calculateGender(genderCode);
  const controlNumber: number = calculateControlNumber(digits);

  details.isValid = controlNumber === controlDigit || (controlNumber > 9 && controlDigit === 0);

  if (!details.isValid) {
    details.error = 'Neispravan JMBG!';
    return details;
  }

  details.dateOfBirth = createDate(yearOfBirth, monthOfBirth, dayOfBirth);
  details.region = region;
  details.gender = gender;
  details.error = '';

  return details;
};

const isNumericString = (input: string): boolean => /^\d+$/.test(input);

const extractDigits = (jmbg: string): number[] => jmbg.split('').map(Number);

const calculateBirthYear = (
  yearOfBirthDigit1: number,
  yearOfBirthDigit2: number,
  yearOfBirthDigit3: number,
  genderDigit3: number
): number => {
  let birthYear: number = parseInt(
    `${yearOfBirthDigit1}${yearOfBirthDigit2}${yearOfBirthDigit3}`,
    10
  );

  if (genderDigit3 >= 0 && genderDigit3 <= 4) {
    birthYear += 2000;
  } else {
    birthYear += 1000;
  }

  return birthYear;
};

const isValidDate = (day: number, month: number, year: number): boolean => {
  if (!isPositiveInteger(day) || !isPositiveInteger(month) || !isPositiveInteger(year)) {
    return false;
  }

  if (!isWithinRange(month, minMonths, maxMonths)) {
    return false;
  }

  const daysInMonth: number = getDaysInMonth(year, month);

  return isWithinRange(day, minDays, daysInMonth);
};

const isPositiveInteger = (value: number): boolean => value > 0;

const isWithinRange = (value: number, min: number, max: number): boolean =>
  value >= min && value <= max;

const getDaysInMonth = (year: number, month: number): number => new Date(year, month, 0).getDate();

const validateRegion = (regionCode: number): string | null => {
  const regionsData: { [controlDigitey: string]: string } = regions;
  return regionsData[regionCode.toString()] || null;
};

const calculateGender = (genderCode: number): GenderType =>
  genderCode >= 0 && genderCode <= 499 ? 'Muški' : 'Ženski';

const calculateControlNumber = (digits: number[]): number => {
  const sum: number =
    7 * (digits[0] + digits[6]) +
    6 * (digits[1] + digits[7]) +
    5 * (digits[2] + digits[8]) +
    4 * (digits[3] + digits[9]) +
    3 * (digits[4] + digits[10]) +
    2 * (digits[5] + digits[11]);

  let controlNumber: number = 11 - (sum % 11);

  if (controlNumber > 9) controlNumber = 0;

  return controlNumber;
};

const createDate = (year: number, month: number, day: number): string | null => {
  const date: Date = new Date(year, month - 1, day);
  return formatDateString(date);
};

const formatDateString = (date: Date): string => {
  const day: string = date.getDate().toString().padStart(2, '0');
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const year: string = date.getFullYear().toString();

  return `${day}.${month}.${year}.`;
};
