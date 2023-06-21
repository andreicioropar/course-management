import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { CoursesService } from '../../services/courses.service';
import { CourseResponse } from 'src/app/shared/model/course.model';
import { Observable, map, shareReplay } from 'rxjs';
import { Select } from '@ngxs/store';
import { AuthState } from 'src/app/shared/redux/auth.state';
import { UserInfo } from 'src/app/shared/model/user.model';
import { createCourseViewRouteUrl } from 'src/app/shared/util/course-url.util';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  createViewRouteUrl = createCourseViewRouteUrl;

  @Select(AuthState.getCurrentUserInfo)
  currentUser$!: Observable<UserInfo>;

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  coursesToDisplay: CourseResponse[] = [];
  displayedCourses: number = 0;
  display: CourseResponse[] = [];
  slideConfig: any;
  showLeftButton: boolean = false;
  showRightButton: boolean = false;
  test: number = 0;

  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((res) => {
      this.coursesToDisplay = res;
      this.updateButtonVisibilty();
      this.shuffleCourseList(this.coursesToDisplay);
    });

    this.updateSlideConfig();
    this.updateDisplay();
    this.displayedCourses = this.slideConfig.slidesToShow;
  }

  public userCanAdd() {
    return this.currentUser$.pipe(
      map((user) => {
        if (user) {
          return (
            user.userRole.includes('Admin') || user.userRole.includes('Teacher')
          );
        } else {
          return false;
        }
      })
    );
  }

  private shuffleCourseList(array: CourseResponse[]) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
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
        infinite: false,
      };
    } else if (windowWidth >= 1800) {
      this.slideConfig = {
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
      };
    } else if (windowWidth >= 1200) {
      this.slideConfig = {
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
      };
    } else if (windowWidth >= 992) {
      this.slideConfig = {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
      };
    } else if (windowWidth >= 768) {
      this.slideConfig = {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
      };
    } else {
      this.slideConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
      };
    }
  }

  private updateDisplay() {
    this.display = this.coursesToDisplay.slice(
      0,
      this.slideConfig.slidesToShow
    );
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

    if (
      this.coursesToDisplay.length > this.displayedCourses &&
      this.showRightButton === false
    ) {
      this.showRightButton = true;
    }

    if (
      this.displayedCourses > initialDisplayedCourses &&
      this.displayedCourses !== this.coursesToDisplay.length
    ) {
      this.showLeftButton = true;
      this.showRightButton = true;
    } else if (
      this.displayedCourses === this.coursesToDisplay.length &&
      this.showRightButton === true
    ) {
      this.showRightButton = false;
      this.showLeftButton = true;
    } else if (this.displayedCourses === initialDisplayedCourses) {
      this.showLeftButton = false;
    }
  }
}
