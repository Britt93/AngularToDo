import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from '../list';
import { ItemService } from '../item.service';
import { Item } from '../item';

import { Observable, Subscription } from 'rxjs';

import { ListService } from '../list.service';




@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  //komt van list.ts
  @Input() list: List = { id: 0, name: "", color: "" };
  @Input() isDetail: boolean = false;

  colors() {
    return { 'color': this.list.color }
  }
  /*
  items$: Observable<Item[]> = new Observable<Item[]>(); 

  lists: List[] = [];
  lists$: Subscription = new Subscription();
  deleteList$: Subscription = new Subscription();
  errorMessage: string = '';
*/

  items: Item[] = [];
  items$: Subscription = new Subscription();
  deleteItem$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private router: Router, private itemService: ItemService, private listService: ListService) { }

  ngOnInit(): void {
    //this.items$ = this.itemService.getItemsOfList(this.list.id);
    this.getItems()
  }

  detail(id: number) {
    this.router.navigate(['/list', id]);
  }

  ngOnDestroy(): void {
    this.items$.unsubscribe();
    this.deleteItem$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['newitem']);
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['edititem/' + id] );
  }

  delete(id: number) {
    this.deleteItem$ = this.itemService.deleteItem(id).subscribe(result => {
      //all went well
      this.getItems();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getItems() {
    this.items$ = this.itemService.getItemsOfList(this.list.id).subscribe(result => this.items = result);
  }

}
