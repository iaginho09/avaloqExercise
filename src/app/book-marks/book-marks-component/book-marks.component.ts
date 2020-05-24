import { Component, OnInit, ViewChild } from '@angular/core';
import { BookMark } from '../Models/book-marks.model';
import { Store, Action, select } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { createBookMark, deleteBookMark, getBookMarks } from '../book-marks-store/book-marks.action';
import { BookMarksState } from '../book-marks-store/book-marks.state';
import { Observable, Subscription } from 'rxjs';
import { BookMarkReducer } from '../book-marks-store/book-marks.reducer';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-book-marks',
  templateUrl: './book-marks.component.html',
  styleUrls: ['./book-marks.component.css']
})
export class BookMarksComponent implements OnInit {

  BookMarksState$: Observable<BookMarksState>;
  bookMarkSubs: Subscription;
  displayedColumns: string[] = ['Title', 'URL', 'Group', 'Delete'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  bookMark: BookMark = {
    Title: "",
    URL: "",
    Group: ""
  }


  profileForm = new FormGroup({
    Title: new FormControl(''),
    URL: new FormControl(''),
    Group: new FormControl(''),
  });


  public isAddOpen: boolean = false;
  public listBookmarks: BookMark[];
  
  constructor(private store: Store<BookMarksState>) {
    this.store.select(state => state).subscribe((response: any) => {
      this.listBookmarks = response.bookMarks.BookMarksList;
      this.dataSource = new MatTableDataSource(this.listBookmarks);
    });
  }

  ngOnInit(): void {
    this.initializeBookMarks();
    this.BookMarksState$ = this.store.pipe(select(BookMarkReducer));
    this.bookMarkSubs = this.BookMarksState$.pipe(map(x => this.listBookmarks = x.BookMarksList)).subscribe();
    this.store.dispatch(getBookMarks());
    this.dataSource.sort = this.sort;
  }

  addBookMark() {
    this.store.dispatch(new createBookMark(this.bookMark));
    this.dataSource.sort = this.sort;
    this.clearForm();
  }

  deleteBookMark(bookMark) {
    this.store.dispatch(new deleteBookMark(bookMark));
    this.dataSource.sort = this.sort;
  }

  clearForm() {
    this.bookMark = {
      Title: "",
      URL: "",
      Group: ""
    }
  }

  initializeBookMarks() {
    this.store.dispatch(new createBookMark({
      "Title": "gmail",
      "URL": "https://www.gmail.com/",
      "Group": "Work"
    }
    ));
    this.store.dispatch(new createBookMark({

      "Title": "youtube",
      "URL": "https://www.youtube.com/",
      "Group": "Social"

    }));
    this.store.dispatch(new createBookMark({

      "Title": "spotify",
      "URL": "https://www.spotify.com/",
      "Group": "Music"

    }));
    this.store.dispatch(new createBookMark({

      "Title": "facebook",
      "URL": "https://www.facebook.com/",
      "Group": "Social"

    }));
  }

  ngOnDestroy() {
    this.bookMarkSubs.unsubscribe();
  }

}
