import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from '../list';
import { ItemService } from '../item.service';
import { Item } from '../item';

import { Observable } from 'rxjs';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  //komt van list.ts
  @Input() list: List = {id: 0, name: "", color: ""};
  @Input() isDetail: boolean = false;

  colors() {
    return {'color': this.list.color}
  }
  
  items$: Observable<Item[]> = new Observable<Item[]>(); 

  constructor(private router: Router, private itemService: ItemService) { }

  ngOnInit(): void {
    this.items$ = this.itemService.getItemsOfList(this.list.id);
  }

  detail(id: number) {
    this.router.navigate(['/list', id]);
  }

}
