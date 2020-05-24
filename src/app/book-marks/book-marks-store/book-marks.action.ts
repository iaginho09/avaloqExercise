import { Action, createAction, props } from "@ngrx/store";
import { BookMark } from '../Models/book-marks.model';


export default interface ActionWithPayload<T> extends Action {
    payload: T;
}

export const getBookMarks = createAction('get_BookMarks');
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

