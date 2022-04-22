import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchFormInput } from './search-form.input';

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {

  @Output() searchFormInput = new EventEmitter<SearchFormInput>();

  suchForm = new FormGroup({
    freitext: new FormControl(''),
    filter: new FormControl(''),
  });

  ngOnInit(): void {
    this.suchForm.valueChanges.subscribe((formValues: SearchFormInput) => {
      const formValid = true;
      if (formValid) {
        this.searchFormInput.emit({
          filter: formValues.filter,
          freitext: formValues.freitext
        });
      }
    })
  }


}
