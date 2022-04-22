import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractSearchFacadeService } from '@red-probeaufgabe/search';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {

  id: string;
  type: string;
  private sub: any;
  data;

  constructor(private route: ActivatedRoute, private searchFacade: AbstractSearchFacadeService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.type = params['type'];

      // TODO Fehlerbehandlung machen, wenn daten nicht gefunden wurden...
      if (this.type === 'Patient') {
        this.searchFacade.findPatientById(this.id).subscribe(data => { this.data = data });
      }
      else if (this.type === 'Practitioner') {
        this.searchFacade.findPractitionerById(this.id).subscribe(data => { this.data = data });
      } else {
        // TODO bessere fehlerbehandlung. evtl mut route gurds.
        console.log("falscher pfad paramter -> Programmierer ist schuld...")
      }
    });
  }

}
