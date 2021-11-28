import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ListService } from './list.service';
import { Item } from '../item/item';
import { ItemService } from '../item/item.service';
import { List } from './list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: List = { id: 0, name: "", color: "" };
  @Input() isDetail: boolean = false;

  items: Item[] = [];
  items$: Subscription = new Subscription();
  deleteItem$: Subscription = new Subscription();

  errorMessage: string = '';

  selectedSort: number = 1;

  constructor(private router: Router, private itemService: ItemService, private listService: ListService, private _location: Location) { }

  ngOnInit(): void {
    this.getItems()
  }

  colors() {
    return { 'color': this.list.color }
  }

  detail(id: number) {
    this.router.navigate(['/list', id]);
  }

  back() {
    this._location.back();
  }

  onSort(event: any) {
    this.selectedSort = event.target.value;
    this.getItems();
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
    this.router.navigate(['edititem/' + id]);
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

    if (this.selectedSort == 1) {
      this.items$ = this.itemService.getItemsOfList(this.list.id).subscribe(result => this.items = result);
    }
    else {

      this.items$ = this.itemService.getItemsOfListSortDate(this.list.id).subscribe(result => this.items = result);
    }
  }
}
