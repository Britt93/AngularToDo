import { Component, Input, OnInit } from '@angular/core';
import { List } from '../list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  //komt van list.ts
  @Input() list: List = {id: 0, name: "", category: ""};

  constructor() { }

  ngOnInit(): void {
  }

}
