import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-courses-search',
  templateUrl: './courses-search.component.html',
  styleUrls: ['./courses-search.component.scss']
})
export class CoursesSearchComponent implements OnInit {

  searchCtrl: FormControl<string>;

  constructor(private formBuilder: FormBuilder) {
    this.searchCtrl = formBuilder.nonNullable.control('');
  }

  ngOnInit(): void {
  }

}
