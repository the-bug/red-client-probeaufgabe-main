import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FhirSearchFn } from '@red-probeaufgabe/types';
import { SearchFormInput } from './search-form.input';

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {

  @Output() searchFormInput = new EventEmitter<SearchFormInput>();

  suchForm = new FormGroup({
    freitext: new FormControl('', [Validators.pattern('[a-zA-Z0-9]+')]),
    filter: new FormControl('1'),
  });

  ngOnInit(): void {
    this.suchForm.valueChanges.subscribe((formValues: SearchFormInput) => {
      const formValid = this.suchForm.valid;

      if (formValid) {
        let filterValue = FhirSearchFn.SearchAll;

        // Das Mapping sollte in eine extra methode und noch schoen gemacht werden. Allerdings bin ich mir nicht sicher, welche Moeglichkeiten hier typescript hat und wenn noch zeit ist, kann ich das am Schluss machen.
        if (formValues.filter[0] === "1") {
          filterValue = FhirSearchFn.SearchAll;

        } else if (formValues.filter[0] === "2") {
          filterValue = FhirSearchFn.SearchPatients;


        } else if (formValues.filter[0] === "3") {
          filterValue = FhirSearchFn.SearchPractitioners;
        }
        else {
          console.error('Dieser Type ist nicht implementiert');
        }

        this.searchFormInput.emit({
          filter: filterValue,
          freitext: formValues.freitext
        });
      }
    })
  }


}
