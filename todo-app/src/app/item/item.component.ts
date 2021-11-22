import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Item = {id:0, text:"", listId:0, date: "2021-10-30T22:00:00.000Z", order: 0, statusId: 1}

  constructor() { }

  ngOnInit(): void {
  }

}
