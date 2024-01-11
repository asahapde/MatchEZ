import { ViewApplicantsComponent } from './components/view-applicants/view-applicants.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsComponent } from './components/applications/applications.component';
import { CourseInformationComponent } from './components/course-information/course-information.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UploadSpreadsheetComponent } from './components/upload-spreadsheet/upload-spreadsheet.component';
import { UploadApplicantSpreadsheetComponent } from './components/upload-applicant-spreadsheet/upload-applicant-spreadsheet.component';
import { AddApplicationQuestionsComponent } from './components/add-application-questions/add-application-questions.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { TaAllocationsComponent } from './components/ta-allocations/ta-allocations.component';
import { SelectCoursesComponent } from './components/select-courses/select-courses.component';
import { InstructorConcernsComponent } from './components/instructor-concerns/instructor-concerns.component';
import { TaAllocationInstructorComponent } from "./components/ta-allocation-instructor/ta-allocation-instructor.component";
import { UploadInstructorSpreadsheetComponent} from './components/upload-instructor-spreadsheet/upload-instructor-spreadsheet.component';
import { UploadCourseSpreadsheetComponent } from './components/upload-course-spreadsheet/upload-course-spreadsheet.component';
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: "login", component: LoginComponent },
  { path: 'register', component: RegistrationComponent},
  {
    path: 'appdashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'courseinfo', pathMatch: 'full' },
      { path: 'uploadspreadsheet', component: UploadSpreadsheetComponent },
      { path: 'courseinfo', component: CourseInformationComponent },
      { path: 'courseapplications', component: ApplicationsComponent },
      { path: 'viewApplicants', component: ViewApplicantsComponent },
      { path: 'allocations', component: TaAllocationsComponent },
      { path: 'applicationQuestions', component: AddApplicationQuestionsComponent },
      { path: 'selectCourses', component: SelectCoursesComponent },
      { path: 'instructor-concerns', component: InstructorConcernsComponent },
      { path: 'taAllocations', component: TaAllocationInstructorComponent },
    ]
  },
  { path: "home", component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
