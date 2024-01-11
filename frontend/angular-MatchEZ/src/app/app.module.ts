import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadSpreadsheetComponent } from './components/upload-spreadsheet/upload-spreadsheet.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { CourseInformationComponent } from './components/course-information/course-information.component';
import { CourseFilterPipe } from './course-filter.pipe';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import {ConfirmEqualValidatorDirective} from './validators/confirm-equal-validator.directive';
import { ApplicationsComponent } from './components/applications/applications.component';
import { ApplicationTableComponent } from './components/application-table/application-table.component';
import { RankApplicantsComponent } from './components/rank-applicants/rank-applicants.component'
import { HomepageComponent } from './components/homepage/homepage.component';
//import { HomepageComponentComponent } from './components/homepage-component/homepage-component.component'

import {UploadApplicantSpreadsheetComponent} from './components/upload-applicant-spreadsheet/upload-applicant-spreadsheet.component';
import { ViewApplicantsComponent } from './components/view-applicants/view-applicants.component';
import { TaAllocationsComponent } from './components/ta-allocations/ta-allocations.component';
import { CourseAllocationsComponent } from './components/course-allocations/course-allocations.component'
import { MatDialogModule } from '@angular/material/dialog';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { EditAllocationComponent } from './components/edit-allocation/edit-allocation.component'
import { AddApplicationQuestionsComponent } from './components/add-application-questions/add-application-questions.component';
import { SelectCoursesComponent } from './components/select-courses/select-courses.component';
import { InstructorConcernsComponent } from './components/instructor-concerns/instructor-concerns.component';
import { ViewConcernComponent } from './components/view-concern/view-concern.component'
import { TaAllocationInstructorComponent } from './components/ta-allocation-instructor/ta-allocation-instructor.component';
import { TaAllocationsTableComponent } from './components/ta-allocations-table/ta-allocations-table.component';
import { ConcernDialogInstructorComponent } from './components/concern-dialog-instructor/concern-dialog-instructor.component';
import { ApplicationQuestionDialogComponent } from './components/application-question-dialog/application-question-dialog.component';
import { UploadInstructorSpreadsheetComponent } from './components/upload-instructor-spreadsheet/upload-instructor-spreadsheet.component';
import { UploadCourseSpreadsheetComponent } from './components/upload-course-spreadsheet/upload-course-spreadsheet.component';
import { UploadSetupSpreadsheetComponent } from './components/upload-setup-spreadsheet/upload-setup-spreadsheet.component';
import { AddTaComponent } from './components/add-ta/add-ta.component'

@NgModule({
  declarations: [
    AppComponent,
    UploadSpreadsheetComponent,
    DashboardComponent,
    LoginComponent,
    CourseInformationComponent,
    CourseFilterPipe,
    RegistrationComponent,
    ConfirmEqualValidatorDirective,
    ApplicationsComponent,
    ApplicationTableComponent,
    RankApplicantsComponent,
    UploadApplicantSpreadsheetComponent,
    ViewApplicantsComponent,
    HomepageComponent,
    TaAllocationsComponent,
    CourseAllocationsComponent,
    EditDialogComponent,
    EditAllocationComponent,
    AddApplicationQuestionsComponent,
    SelectCoursesComponent,
    InstructorConcernsComponent,
    ViewConcernComponent,
    TaAllocationInstructorComponent,
    TaAllocationsTableComponent,
    ConcernDialogInstructorComponent,
    ApplicationQuestionDialogComponent,
    UploadInstructorSpreadsheetComponent,
    UploadCourseSpreadsheetComponent,
    UploadSetupSpreadsheetComponent,
    AddTaComponent
   // HomepageComponentComponent
  ],
  entryComponents: [
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
