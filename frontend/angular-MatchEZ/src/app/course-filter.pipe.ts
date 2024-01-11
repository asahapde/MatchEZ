import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseFilter'
})
export class CourseFilterPipe implements PipeTransform {

  transform(courses:String[], courseName:string): String[]{
    if(!courses || !courseName){
        return courses;
    }
 
    return courses.filter(course=> course['Course '] === courseName.toUpperCase())
}

}
