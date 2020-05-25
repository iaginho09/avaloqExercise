import { Component, OnInit, ViewChild } from '@angular/core';
import { BookMark } from '../Types/book-marks.model';
import { Store, Action, select } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { createBookMark, deleteBookMark, getBookMarks, createArrayBookMarks, updateBookMark } from '../book-marks-store/book-marks.action';
import { BookMarksState } from '../book-marks-store/book-marks.state';
import { Observable, Subscription } from 'rxjs';
import { BookMarkReducer } from '../book-marks-store/book-marks.reducer';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



const initializeArray:BookMark[] = 
      [{
        Title:"gmail",
        URL:"https://www.gmail.com/",
        Group:"Work"
      },
      {
        Title:"youtube",
        URL:"https://www.youtube.com/",
        Group:"Social"
      },
      {
        Title:"spotify",
        URL:"https://www.spotify.com/",
        Group:"Music"
      },
      {
        Title:"facebook",
        URL:"https://www.facebook.com/",
        Group:"Social"
      }]


@Component({
  selector: 'app-book-marks',
  templateUrl: './book-marks.component.html',
  styleUrls: ['./book-marks.component.css']
})


export class BookMarksComponent implements OnInit {

  BookMarksState$: Observable<BookMarksState>;
  bookMarkSubs: Subscription;
  displayedColumns: string[] = ['Title', 'URL', 'Group', 'Delete','Update'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  update:boolean=false;

  bookMark: BookMark = {
    Title: "",
    URL: "",
    Group: ""
  }
  previousBookMark: BookMark = {
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

  updateBookMarks(bookMark) {
    this.update=true;
    this.bookMark.Title = bookMark.Title;
    this.bookMark.URL = bookMark.URL;
    this.bookMark.Group = bookMark.Group;
    this.previousBookMark.Title = bookMark.Title;
    this.previousBookMark.URL = bookMark.URL;
    this.previousBookMark.Group = bookMark.Group;
    
  }

  updateBookMark(){
    this.store.dispatch(new updateBookMark(this.bookMark,this.previousBookMark));
    this.dataSource.sort = this.sort;
    this.update=false;
    this.clearForm();
  }

  clearForm() {
    this.bookMark = {
      Title: "",
      URL: "",
      Group: ""
    }
    this.previousBookMark = {
      Title: "",
      URL: "",
      Group: ""
    }
  }

  initializeBookMarks() {
    this.store.dispatch(new createArrayBookMarks(initializeArray));
  }

  ngOnDestroy() {
    this.bookMarkSubs.unsubscribe();
  }

}
