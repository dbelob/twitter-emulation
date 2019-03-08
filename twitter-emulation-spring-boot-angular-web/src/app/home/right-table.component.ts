import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-table',
  templateUrl: './right-table.component.html'
})
export class RightTableComponent implements OnInit {
  private copyrightDate = new Date();

  constructor() {
  }

  ngOnInit() {
  }
}
