export interface PoetType {
  _id: string;
  name: string;
  time_period: string;
  bio: string;
  reviewed: boolean;
}


export enum ERROR_MSG {
  NOT_AVAILABLE = 'No poet available',
  NOT_FOUND = "Poet's not found",
  NOT_VALID = 'Data for poet is not valid',
  // Inner Properties
  NAME = 'name should be letters, and max 50 letters length',
  TIME_PERIOD = 'time_period should be letters, and max 50 letters length',
  BIO = 'bio should be letters, and max 300 letters length',
  REVIEWED = 'reviewed should be true or false',
}
