import { NgModule } from '@angular/core';
import { PractitionerSearchService } from './services/practitioner-search.service';
import { SearchFacadeService } from './services/search-facade.service';
import { PatientSearchService } from './services/patient-search.service';
import { AbstractSearchFacadeService } from './services/abstract-search-facade.service';

const searchFacadeServiceProvider = {
  provide: AbstractSearchFacadeService,
  useFactory: (patientSearchService: PatientSearchService, practitionerService: PractitionerSearchService) => new SearchFacadeService(patientSearchService, practitionerService),
  deps: [
    PatientSearchService,
    PractitionerSearchService
  ]
}

@NgModule({
  providers: [PractitionerSearchService, PatientSearchService, SearchFacadeService, searchFacadeServiceProvider],
  bootstrap: [],
})
export class SearchModule { }
