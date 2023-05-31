import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  coursesToDisplay: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  displayedCourses: number = 0;
  display: number[] = [];
  slideConfig: any;
  showLeftButton: boolean = false;
  showRightButton: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.shuffleCourseList(this.coursesToDisplay);
    this.updateSlideConfig();
    this.updateDisplay();
    this.displayedCourses = this.slideConfig.slidesToShow;
  }

  private shuffleCourseList(array: number[]) {
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

    if (this.displayedCourses > initialDisplayedCourses && this.displayedCourses !== this.coursesToDisplay.length) {
      this.showLeftButton = true;
      this.showRightButton = true;
    } else if (this.displayedCourses === this.coursesToDisplay.length) {
      this.showRightButton = false;
    } else if (this.displayedCourses === initialDisplayedCourses) {
      this.showLeftButton = false;
    }
  }

}
