import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, startWith, tap } from 'rxjs/operators';
import { SiteTitleService } from '@red-probeaufgabe/core';
import { FhirSearchFn, IFhirPatient, IFhirPractitioner, IFhirSearchResponse } from '@red-probeaufgabe/types';
import { IUnicornTableColumn } from '@red-probeaufgabe/ui';
import { AbstractSearchFacadeService } from '@red-probeaufgabe/search';
import { SearchFormInput } from 'app/ui/search-form/search-form.input';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // Init unicorn columns to display
  columns: Set<IUnicornTableColumn> = new Set<IUnicornTableColumn>([
    'number',
    'resourceType',
    'name',
    'gender',
    'birthDate',
  ]);
  isLoading = true;

  /*
   * Implement search on keyword or fhirSearchFn change
   **/
  formValues: SearchFormInput = { freitext: '', filter: FhirSearchFn.SearchAll };

  search$: Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> = this.createSearch();

  entries$: Observable<Array<IFhirPatient | IFhirPractitioner>> = this.createEntries();

  totalLength$ = this.createTotalLength();


  constructor(private siteTitleService: SiteTitleService, private searchFacade: AbstractSearchFacadeService) {
    this.siteTitleService.setSiteTitle('Dashboard');
  }
  
  searchFormInputChange(formValues: SearchFormInput) {
    this.isLoading = true;
    this.formValues = formValues;

    this.search$ = this.createSearch();
    this.entries$ = this.createEntries();
    this.totalLength$ = this.createTotalLength();

  }

  private createSearch(): Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> {
    return this.searchFacade
      .search(this.formValues.filter, this.formValues.freitext)
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          this.isLoading = false;
        }),
        shareReplay(),
      );
  }

  private handleError(): Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> {
    return of({ entry: [], total: 0 });
  }

  private createEntries(): Observable<Array<IFhirPatient | IFhirPractitioner>> {
    return this.search$.pipe(
      map((data) => !!data && data.entry),
      startWith([]),
    );
  }

  private createTotalLength() {
    return this.search$.pipe(
      map((data) => !!data && data.total),
      startWith(0),
    );
  }

}
