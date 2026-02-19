export type Slug =
  | "abs"
  | "adductors"
  | "ankles"
  | "back-top"
  | "biceps"
  | "calves"
  | "chest"
  | "deltoids"
  | "feet"
  | "forearm"
  | "gluteal"
  | "gluteus"
  | "hamstring"
  | "hands"
  | "hair"
  | "head"
  | "knees"
  | "lower-back"
  | "neck"
  | "obliques"
  | "quadriceps"
  | "tibialis"
  | "trapezius"
  | "triceps"
  | "upper-back";

export interface BodyPart {
  slug: Slug;
  color?: string;
  path: {
    common?: string[];
    left?: string[];
    right?: string[];
  };
}
