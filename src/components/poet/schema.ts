import {
  pipe,
  optional,
  picklist,
  object,
  string,
  trim,
  maxLength,
  minLength,
  boolean,
} from 'valibot';
// utils
import { nameSchema } from '../../utils/schemas';

const timePeriod = [
  'جاهلي',
  'أموي',
  'عباسي',
  'أندلسي',
  'عثماني ومملوكي',
  'متأخر وحديث',
  'القرن العشرين',
];

const TimePeriodSchema = picklist(timePeriod);

const bioSchema = pipe(string(), trim(), minLength(4), maxLength(500))

export const createSchema = object({
  name: nameSchema,
  time_period: TimePeriodSchema,
  bio: bioSchema,
  reviewed: boolean(),
});

export const updateSchema = object({
  name: optional(nameSchema),
  time_period: optional(TimePeriodSchema),
  bio: optional(bioSchema),
  reviewed: optional(boolean()),
});
