import { BookMark } from '../Types/book-marks.model';


export interface BookMarksState {
    BookMarksList:any;
}

export const intializeBookMarks = (): BookMarksState =>{
    return ({BookMarksList : []});
}

