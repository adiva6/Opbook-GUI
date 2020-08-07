import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {CourseService} from '../../services/course/course.service';
import {forkJoin, merge, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth/auth.service';
import {Course} from '../../models/course/course';
import {User} from '../../models/user/user';

@Injectable()
export class CourseGuard implements CanActivate, CanActivateChild {
    private course: Course;
    private currentUser: User;

    constructor(private courseService: CourseService,
                private authService: AuthService) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const courseSymbol = route.paramMap.get('courseSymbol');
        return forkJoin(this.initCourse(courseSymbol), this.initUser()).pipe(
            map(_ => {
                return this.course.students.some(student => student.id === this.currentUser.id);
            })
        );
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
        return this.canActivate(childRoute, state);
    }

    private initCourse(courseSymbol: string): Observable<Course> {
        return this.courseService.getCourseBySymbol(courseSymbol).pipe(
            tap(course => this.course = course)
        );
    }

    private initUser(): Observable<User> {
        return this.authService.getUser().pipe(
            tap( user => this.currentUser = user)
        );
    }
}
