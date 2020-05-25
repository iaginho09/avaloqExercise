import { BookMarksState, intializeBookMarks } from "./book-marks.state";
import { Action } from "@ngrx/store";
import ActionWithPayload from './book-marks.action';
import { BookMark } from '../Types/book-marks.model';

const initialState = intializeBookMarks();

export function BookMarkReducer(state: BookMarksState = initialState,
    action: Action) {
    switch (action.type) {
        case 'get_BookMarks':
            console.log("hola2", action)
            return {
                ...state
            };

        case "initializate_List":
            const listBookmarks: BookMark[] = (action as ActionWithPayload<BookMark[]>).payload;
            return ({
                ...state,
                BookMarksList: state.BookMarksList.concat(listBookmarks)
            });

        case 'create_BookMark':
            return ({
                ...state,
                BookMarksList: state.BookMarksList.concat((action as ActionWithPayload<BookMark>).payload)
            });

        case 'update_BookMark':
            return ({
                ...state,
                BookMarksList: state.BookMarksList.map((item,index) =>{                   
                    if((action as ActionWithPayload<BookMark>).lastValue.Title === item.Title){
                        return (action as ActionWithPayload<BookMark>).payload;
                    }else{
                        return item;
                    }
                })
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