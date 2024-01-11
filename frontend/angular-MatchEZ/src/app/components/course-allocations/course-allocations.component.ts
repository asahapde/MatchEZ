import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {ChangeDetectorRef } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EditAllocationComponent } from '../edit-allocation/edit-allocation.component';
import { AddTaComponent } from '../add-ta/add-ta.component';
import { FetchApplicationsService } from 'src/app/services/fetch-applications.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-course-allocations',
  templateUrl: './course-allocations.component.html',
  styleUrls: ['./course-allocations.component.css']
})
export class CourseAllocationsComponent implements OnInit {

  @Input() courseAllocationInfo: any;
  listData: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  displayedColumns: string[] = ["course", "name", "email", "hrs", "type", "actions", "delete"]

  constructor(private cdref: ChangeDetectorRef, public dialog: MatDialog, private fetchApplicationsSercive: FetchApplicationsService, private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.listData = new MatTableDataSource(this.courseAllocationInfo.allocations);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.cdref.detectChanges();
  }

  openDialog(info: Object) {
    const dialogRef = this.dialog.open(EditAllocationComponent, {
      data: {info: info, courses: this.courseAllocationInfo.courses}
    });
  }

  openAddTaDialog(){
    const dialogRef = this.dialog.open(AddTaComponent, {
      data: {courses: this.courseAllocationInfo.courses}
    })
  }

  clear(): void {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(): void {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  delete(ta: Object): void{
    this.fetchApplicationsSercive.delete(ta).subscribe(data => {
      if(data.err === undefined){
        this.refreshTable();
      }
      else{
        alert(data.err);
      }
    })
  }

  refreshTable() {
    // save current route first
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });
  }

}
