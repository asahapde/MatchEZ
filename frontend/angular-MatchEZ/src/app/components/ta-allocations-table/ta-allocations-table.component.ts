import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConcernDialogInstructorComponent } from "../concern-dialog-instructor/concern-dialog-instructor.component";
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ta-allocations-table',
  templateUrl: './ta-allocations-table.component.html',
  styleUrls: ['./ta-allocations-table.component.css']
})
export class TaAllocationsTableComponent implements OnInit {

  @Input() courseAllocationInfo: any;
  listData: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  displayedColumns: string[] = ["course", "name", "email", "hrs", "type"]

  constructor(private cdref: ChangeDetectorRef, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.listData = new MatTableDataSource(this.courseAllocationInfo.allocations);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.cdref.detectChanges();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConcernDialogInstructorComponent, {
      height: '350px',
      width: '600px',
      //data: {course: course},
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  clear(): void {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(): void {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.courseAllocationInfo);
    this.ngAfterViewInit()
  }

}
