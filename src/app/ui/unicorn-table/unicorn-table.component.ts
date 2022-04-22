import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IUnicornTableColumn } from '../models';
import { IFhirPatient, IFhirPractitioner } from '@red-probeaufgabe/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unicorn-table',
  templateUrl: './unicorn-table.component.html',
  styleUrls: ['./unicorn-table.component.scss'],
})
export class UnicornTableComponent implements OnInit {
  dataSource: MatTableDataSource<IFhirPatient | IFhirPractitioner> = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() columns: Set<IUnicornTableColumn> = new Set<IUnicornTableColumn>();
  @Input() totalLength = 0;
  @Input() isLoading = false;



  constructor(private router: Router) { }

  @Input()
  set entries(value: Array<IFhirPatient | IFhirPractitioner>) {
    this.dataSource.data = value;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  onRowClick(item) {
    const id = item["id"];
    const type = item["resourceType"];

    this.router.navigate([`/detail/${type}/${id}`]);
  }
}
