import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { CoursesService } from '../../services/courses.service';
import { Course } from 'src/app/shared/model/course.model';
import { Curricula } from 'src/app/shared/model/curricula.model';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  coursesToDisplay: Course[] = [];
  displayedCourses: number = 0;
  display: Course[] = [];
  slideConfig: any;
  showLeftButton: boolean = false;
  showRightButton: boolean = false;
  curricula!: Curricula;
  cachedLessonCounts: Map<number, Observable<number>> = new Map<number, Observable<number>>();
  test: number = 0;

  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    this.courseService.getAllCourses()
      .subscribe(res => {
        this.coursesToDisplay = res;
        this.updateButtonVisibilty();
        this.shuffleCourseList(this.coursesToDisplay);
      });

    this.updateSlideConfig();
    this.updateDisplay();
    this.displayedCourses = this.slideConfig.slidesToShow;
  }

  getNumberOfLessons(course: Course): Observable<number> {
    const courseId = course.id;

    if (this.cachedLessonCounts.has(courseId)) {
      return this.cachedLessonCounts.get(courseId)!;
    }

    const lessonCount$ = this.courseService.getCurriculaByCourseId(courseId)
      .pipe(
        map(res => res.lessonDTOList.length),
        shareReplay(1)
      );

    this.cachedLessonCounts.set(courseId, lessonCount$);

    return lessonCount$;
  }

  private shuffleCourseList(array: Course[]) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }
  }

  private updateSlideConfig() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 2400) {
      this.slideConfig = {
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        infinite: false
      };
    } else if (windowWidth >= 1800) {
      this.slideConfig = {
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        infinite: false
      };
    } else if (windowWidth >= 1200) {
      this.slideConfig = {
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        infinite: false
      };
    } else if (windowWidth >= 992) {
      this.slideConfig = {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        infinite: false
      };
    } else if (windowWidth >= 768) {
      this.slideConfig = {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        infinite: false
      };
    } else {
      this.slideConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: false
      };
    }
  }

  private updateDisplay() {
    this.display = this.coursesToDisplay.slice(0, this.slideConfig.slidesToShow);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.updateSlideConfig();
    this.updateDisplay();
  }

  next() {
    this.slickModal.slickNext();
    this.displayedCourses++;
    this.updateButtonVisibilty();
  }

  prev() {
    this.slickModal.slickPrev();
    this.displayedCourses--;
    this.updateButtonVisibilty();
  }

  private updateButtonVisibilty() {
    const initialDisplayedCourses = this.slideConfig.slidesToShow;

    if (this.coursesToDisplay.length > this.displayedCourses && this.showRightButton === false) {
      this.showRightButton = true;
    }

    if (this.displayedCourses > initialDisplayedCourses && this.displayedCourses !== this.coursesToDisplay.length) {
      this.showLeftButton = true;
      this.showRightButton = true;
    } else if (this.displayedCourses === this.coursesToDisplay.length && this.showRightButton === true) {
      this.showRightButton = false;
      this.showLeftButton = true;
    } else if (this.displayedCourses === initialDisplayedCourses) {
      this.showLeftButton = false;
    }
  }

}
