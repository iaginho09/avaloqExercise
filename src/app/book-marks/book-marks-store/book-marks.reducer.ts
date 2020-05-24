import { BookMarksState, intializeBookMarks } from "./book-marks.state";
import { Action } from "@ngrx/store";
import ActionWithPayload from './book-marks.action';
import { BookMark } from '../Models/book-marks.model';

const initialState = intializeBookMarks();

export function BookMarkReducer(state: BookMarksState = initialState,
    action: Action) {
        
    switch (action.type) {
        case 'get_BookMarks':
            return {
                ...state
            };

        case 'create_BookMark':
            return ({
                ...state,
                BookMarksList: state.BookMarksList.concat((action as ActionWithPayload<BookMark>).payload)
            });

        case 'delete_BookMark':
            return ({
                ...state,
                BookMarksList: state.BookMarksList.filter(bookmark => bookmark !== (action as ActionWithPayload<BookMark>).payload)
            });

        default:
            return state;
    }

}