import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {

  suchForm = new FormGroup({
    freitext: new FormControl(''),
    filter: new FormControl(''),
  });
}
