import { ApplicantsService } from './../../services/applicants.service';
import { CourseInfoService } from './../../course-info.service';
import { Component, OnInit, Input } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {FormArray, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { SelectCoursesService } from 'src/app/services/select-courses.service';
@Component({
  selector: 'app-add-application-questions',
  templateUrl: './add-application-questions.component.html',
  styleUrls: ['./add-application-questions.component.css']
})
export class AddApplicationQuestionsComponent implements OnInit {

  @Input() courses: string[];
  courseSelection: string = "";
  Arr: string[] = [];
  myForm: FormGroup;
  submitStatus: boolean = false;

   constructor(private fb: FormBuilder,private courseService: SelectCoursesService, private applicantService: ApplicantsService) { }
  ngOnInit(): void {
    this.getCourses();
    this.myForm = this.fb.group({
      questions: this.fb.array([])
    })
    this.addQuestion();
  }

  get questionForms(){
    return this.myForm.get('questions') as FormArray;
  }

  addQuestion(){
    const question = this.fb.group({
      text: ['',[
        Validators.required
      ]]
    })

    this.questionForms.push(question);
  }

  delete(i){
    this.questionForms.removeAt(i);
  }

  getCourses(): void{
    this.courseService.getInstructorCourses(localStorage.getItem('email')).subscribe(data => {
      this.Arr = data.courses;
    })
  }

  // getCourseNames() {
  //   this.courseService.getAllCoursesInfo().subscribe(data => {
  //     console.log(data);
  //     this.Arr = [];
  //     data.forEach((course) => {
  //       this.Arr.push(course['course'])
  //     })
  //   })
  // }

  submit(){
    const questions = this.questionForms.value.map(element => element.text);

    const newFormData = { course: this.courseSelection, questions: questions };

    this.applicantService.submitQuestions(newFormData).subscribe(data => {
      if(data.savedMessage != undefined){
        alert(data.savedMessage)
      }
      else{
        alert("The questions could not be saved at this time");
      }
    });
    this.questionForms.reset();
    this.courseSelection = "";
  }

  setStatus(){
    this.submitStatus = true;
  }

}