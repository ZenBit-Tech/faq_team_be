import { format, subYears } from 'date-fns';
import * as seedrandom from 'seedrandom';
import { v4 as uuidv4 } from 'uuid';

import { random_date_format } from 'src/utils/constants/fakeConstants';

export const generateSeededUUIDs = (seed: string, count: number): string[] => {
  const rng = seedrandom(seed);
  const uuids = [];

  for (let i = 0; i < count; i++) {
    const randomUUID = uuidv4({
      random: Array.from({ length: 16 }, () => Math.floor(rng() * 256)),
    });
    uuids.push(randomUUID);
  }

  return uuids;
};

export const getRandomIntInclusive = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomDateWithinLastYear = (): string => {
  const currentDate = new Date();

  const oneYearAgoDate = subYears(currentDate, 1);

  const randomTimestamp =
    Math.floor(
      Math.random() * (currentDate.getTime() - oneYearAgoDate.getTime()),
    ) + oneYearAgoDate.getTime();

  const randomDate = new Date(randomTimestamp);

  const formattedRandomDate = format(randomDate, random_date_format);

  return formattedRandomDate;
};
