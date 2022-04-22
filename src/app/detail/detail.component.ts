import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractSearchFacadeService, FhirUtilService } from '@red-probeaufgabe/search';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {

  id: string;
  type: string;
  private sub: Subscription;
  data;
  dataFine;

  constructor(
    private route: ActivatedRoute,
    private searchFacade: AbstractSearchFacadeService,
    private fhirUtilService: FhirUtilService) { }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.type = params['type'];

      // TODO Fehlerbehandlung machen, wenn daten nicht gefunden wurden...
      if (this.type === 'Patient') {
        this.searchFacade.findPatientById(this.id).subscribe(data => {
          this.prepareData(data);
        });
      }
      else if (this.type === 'Practitioner') {
        this.searchFacade.findPractitionerById(this.id).subscribe(data => {
          this.prepareData(data);
        });
      } else {
        // TODO bessere fehlerbehandlung. evtl mut route gurds.
        console.log("falscher pfad paramter -> Programmierer ist schuld...")
      }
    });
  }

  private prepareData(data) {
    this.data = data
    this.dataFine = this.fhirUtilService.prepareData(this.data);
  }



  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
