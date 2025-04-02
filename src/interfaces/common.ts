type StudyShift = TwoPeriodPerSession | OnePeriodPerSession;
type TwoPeriodPerSession = "17h45 - 19h15" | "19h30 - 21h00";
type OnePeriodPerSession =
  | "08h00 - 11h00"
  | "13h00 - 16h00"
  | "16h15 - 19h15"
  | "19h30 - 21h30";
type StudyWeek = TwiceAWeek | OnceAWeek;
type TwiceAWeek = "2-4" | "3-5" | "4-6";
type OnceAWeek = "7" | "8";
type Role = "admin" | "student" | "parent" | "tutor" | "academic" | "support";

export type {
  StudyShift,
  StudyWeek,
  Role,
  TwiceAWeek,
  TwoPeriodPerSession,
  OnceAWeek,
  OnePeriodPerSession,
};
