import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SelectCoursesService } from 'src/app/services/select-courses.service';

@Component({
  selector: 'app-select-courses',
  templateUrl: './select-courses.component.html',
  styleUrls: ['./select-courses.component.css']
})
export class SelectCoursesComponent implements OnInit {
  myControl = new FormControl();
  myProfControl = new FormControl();

  options: string[] = ['SE2202A', 'SE2203', 'SE3351'];
  profOptions: string[] = ['Shafiq', 'Max', 'Abdullah'];
  courses: string[] = [];

  selectedCourse: string = "";
  searchBoxValue: string = "";

  profSearchBoxValue: string = "";
  selectedProf: string = "";

  selectedDeleteCourse: string = "";

  showWarning: boolean = false;

  filteredOptions: Observable<string[]>;
  filteredProfOptions: Observable<string[]>;

  constructor(private selectCoursesService: SelectCoursesService) { }

  ngOnInit() {
    this.selectCoursesService.getCourseCodes().subscribe(i => {
      this.options = i.codes;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    });

    this.selectCoursesService.getInstructorEmails().subscribe(i => {
      this.profOptions = i.emails;
      this.filteredProfOptions = this.myProfControl.valueChanges.pipe(
        startWith(''),
        map(value => this._profFilter(value))
      );
    });

    this.filteredProfOptions = this.myProfControl.valueChanges.pipe(
      startWith(''),
      map(value => this._profFilter(value))
    );


  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _profFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.profOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  public addCourse() {
    let match = this.options.find(i => i.toLowerCase() == this.searchBoxValue.toLowerCase())

    if (this.selectedCourse != "") {
      if (this.selectedCourse == this.searchBoxValue) {
        this.selectCoursesService.addCourse(this.selectedCourse, this.selectedProf).subscribe(i => {
          console.log(i.courses);
          this.courses = i.courses;
        }, err => {
          alert(err.error.err);
        });

      }
      else if (!!match) {
        this.selectCoursesService.addCourse(match, this.selectedProf).subscribe(i => {
          console.log(i.courses);
          this.courses = i.courses;
        }, err => {
          alert(err.error.err);
        });
      }
    } else if (this.searchBoxValue != "") {
      this.selectCoursesService.addCourse(match, this.selectedProf).subscribe(i => {
        console.log(i.courses);
        this.courses = i.courses;
      }, err => {
        alert(err.error.err);
      });
    }
  }

  public removeCourse(course) {
    this.selectedDeleteCourse = course;
    this.showWarning = true;

  }

  public cancelWarning(){
    this.selectedDeleteCourse = "";
    this.showWarning = false;
  }

  public deleteCourse() {
    this.selectCoursesService.deleteCourse(this.selectedDeleteCourse, this.selectedProf).subscribe(i => {
      this.courses = i.courses;
    });
    this.showWarning = false;
  }



  public getCourses() {
    this.selectCoursesService.getInstructorCourses(this.selectedProf).subscribe(i => {
      this.courses = i.courses;
    });
  }

  public selectCourse(course) {
    this.selectedCourse = course;
  }

  public changeInputValue(event) {
    this.searchBoxValue = event.target.value;
  }

  public directSelectProf(prof) {
    console.log(prof);
    this.selectedProf = prof;
    this.getCourses();
  }

  public selectProf() {
    let match = this.profOptions.find(i => i.toLowerCase() == this.profSearchBoxValue.toLowerCase())
    console.log(this.profSearchBoxValue);
    if (this.selectedCourse != "") {
      if (this.selectedCourse == this.profSearchBoxValue) {
        console.log("here");

        this.selectedProf = match;
        this.getCourses();
      }
      else if (!!match) {
        console.log("here");

        this.selectedProf = match;
        this.getCourses();
      } else {
        this.selectedProf = '';
      }
    } else if (this.profSearchBoxValue != "" && !!match) {
      console.log(match);
      
      this.selectedProf = match;
      this.getCourses();
    } else {
      this.selectedProf = '';
    }
  }
}
