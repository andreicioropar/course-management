import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LessonRequest, LessonResponse } from '../../model/lesson.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonsService } from 'src/app/lessons/services/lessons.service';
import { Select } from '@ngxs/store';
import { AuthState } from '../../redux/auth.state';
import { Observable } from 'rxjs';
import { UserInfo } from '../../model/user.model';

@Component({
  selector: 'app-lessons-add',
  templateUrl: './lessons-add.component.html',
  styleUrls: ['./lessons-add.component.scss'],
})
export class LessonsAddComponent implements OnInit {
  @Output() lesson = new EventEmitter<LessonResponse>();

  lessonForm!: FormGroup;
  selectedFile: any = null;
  content?: string;
  savedLesson?: LessonResponse;
  userId: number = 0;

  @Select(AuthState.getCurrentUserInfo)
  currentUser$!: Observable<UserInfo>;

  constructor(
    private formBuilder: FormBuilder,
    private lessonService: LessonsService
  ) {}

  ngOnInit(): void {
    this.initLessonForm();
  }

  private initLessonForm(lesson?: LessonResponse) {
    this.lessonForm = this.formBuilder.group({
      lessonName: this.formBuilder.nonNullable.control(
        {
          value: lesson?.name || '',
          disabled: false,
        },
        [Validators.required, Validators.minLength(1), Validators.maxLength(50)]
      ),
      content: this.formBuilder.control(
        {
          value: lesson?.content,
          disabled: false,
        },
        [Validators.required]
      ),
    });
  }

  private getUserId(): number {
    this.currentUser$.subscribe((user) => (this.userId = user.id));

    return this.userId;
  }

  saveLesson() {
    const lessonName = this.lessonForm.get('lessonName')?.value;
    // const content = this.content || '';
    const content = '4pyTIMOgIGxhIG1vZGU=';
    const userId = this.getUserId();

    const lesson: LessonRequest = {
      name: lessonName,
      content: content,
      userId: userId,
    };

    this.lessonService.addLesson(lesson).subscribe((res) => {
      this.lesson.emit(res);
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const blob = new Blob([arrayBuffer], { type: file.type });

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          const contentBase64 = fileReader.result as string;
          const base64 = contentBase64.split(',')[1]; // Extract the base64 string
          this.content = base64;
        };
        fileReader.readAsDataURL(blob);
      };
      reader.readAsArrayBuffer(file);
    }
  }
}
