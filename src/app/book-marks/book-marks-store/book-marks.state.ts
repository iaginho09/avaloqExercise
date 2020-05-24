import { BookMark } from '../Models/book-marks.model';


export interface BookMarksState {
    BookMarksList:BookMark[];
}

export const intializeBookMarks = (): BookMarksState =>{
    return ({BookMarksList : []});
}
