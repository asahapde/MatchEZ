import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApplicationsService } from '../../services/fetch-applications.service';
@Component({
  selector: 'app-ta-allocations',
  templateUrl: './ta-allocations.component.html',
  styleUrls: ['./ta-allocations.component.css']
})
export class TaAllocationsComponent implements OnInit {

  constructor(private fetchService: FetchApplicationsService, private router: Router) { }

  allocations: any[] = [];
  courses: string[] = [];
  courseAllocationInfo: Object;

  ngOnInit(): void {
    this.getAllocations();
  }

  getAllocations(): void {
    this.fetchService.getAllocations().subscribe(data => {
      console.log(data)
      data.forEach(a => {
        a.allocations.forEach(b => {
          this.allocations.push(b);
        })
      })
     
      // this.allocations.filter(a => {
      //   let unique = this.courses.find(b => b === a.course)
      //   if (unique === undefined) {
      //     this.courses.push(a.course);
      //   }
      // })

      data.forEach(a => {
        this.courses.push(a.course)
      })

      console.log(this.allocations)

      this.courseAllocationInfo = {
        allocations: this.allocations,
        courses: this.courses
      }
    })
  }

  startMatching(): void{
    this.fetchService.startMatching().subscribe(data => {
      this.refreshTable();
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
