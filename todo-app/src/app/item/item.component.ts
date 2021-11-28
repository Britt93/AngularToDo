import { Component, Input, OnInit } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Item = {id:0, description:"", listId:0, date: "2021-10-30", order: 0, isDone: false}

  constructor() { }

  ngOnInit(): void {
  }

}
