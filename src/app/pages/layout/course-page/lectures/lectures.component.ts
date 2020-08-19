import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Course} from '../../../../models/course/course';
import {Lecture} from '../../../../models/lecture/lecture';
import {LectureService} from '../../../../services/lecture/lecture.service';
import {tap} from 'rxjs/operators';
import {AuthService} from "../../../../services/auth/auth.service";

@Component({
    selector: 'app-lectures',
    templateUrl: './lectures.component.html',
    styleUrls: ['./lectures.component.scss']
})
export class LecturesComponent implements OnInit, OnChanges {
    @Input() course: Course;
    public lectures: Lecture[];

    constructor(private lectureService: LectureService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.initLectures();
    }

    ngOnChanges(): void {
        this.initLectures();
    }

    private initLectures(): void {
        this.lectureService.getCourseLectures(this.course.courseSymbol).pipe(
            tap(lectures => this.lectures =
                lectures.sort((l1, l2) => l2.creationTime.getTime() - l1.creationTime.getTime()))
        ).subscribe();
    }

    public isAdmin(): boolean {
        return this.authService.isUserAdmin();
    }

    public onLectureUpload($event: Lecture): void {
        this.initLectures();
    }
}
