import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { SearchModule } from '@red-probeaufgabe/search';
import { UiModule } from '@red-probeaufgabe/ui';
import { DetailRoutingModule } from './detail-routing.module';

@NgModule({
  declarations: [DetailComponent],
  imports: [CommonModule, UiModule, SearchModule, DetailRoutingModule],
  exports: [DetailComponent],
})
export class DetaildModule { }
