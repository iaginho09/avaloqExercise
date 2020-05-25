import { Action, createAction, props } from "@ngrx/store";
import { BookMark } from '../Types/book-marks.model';


export default interface ActionWithPayload<T> extends Action {
    payload: T;
}

export const getBookMarks = createAction('get_BookMarks');

export class createArrayBookMarks implements ActionWithPayload<BookMark[]> {
    readonly type = "initializate_List";
    payload: BookMark[];

    constructor(payload: BookMark[]) {
        this.payload = payload;
    }
}

export class createBookMark implements ActionWithPayload<BookMark> {
    readonly type = "create_BookMark";
    payload: BookMark;

    constructor(payload: BookMark) {
        this.payload = payload;
    }
}
export class deleteBookMark implements ActionWithPayload<BookMark> {
    readonly type = "delete_BookMark";
    payload: BookMark;

    constructor(payload: BookMark) {
        this.payload = payload;
    }
}


