import { ICourseCard } from "./ICourse";

export default interface ISearchCoursePagination {
    productsPerPage: number;
    totalProducts: number; 
    courseList: ICourseCard[];
}