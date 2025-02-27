import { ICourseCard } from "./ICourse";

export default interface IRegisteredCard extends ICourseCard {
  isOnline: boolean;
}
