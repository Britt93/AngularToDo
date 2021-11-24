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
  @Input() list: List = {id: 0, name: "", color: ""};
  @Input() isDetail: boolean = false;

  colors() {
    return {'color': this.list.color}
  }
  
  items$: Observable<Item[]> = new Observable<Item[]>(); 


  lists: List[] = [];
  lists$: Subscription = new Subscription();
  deleteList$: Subscription = new Subscription();
  errorMessage: string = '';



  constructor(private router: Router, private itemService: ItemService, private listService: ListService) { }

  ngOnInit(): void {
    this.items$ = this.itemService.getItemsOfList(this.list.id);
  }

  detail(id: number) {
    this.router.navigate(['/list', id]);
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['list/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.deleteList$ = this.listService.deleteList(id).subscribe(result => {
      //all went well
      this.getLists();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getLists() {
    this.lists$ = this.listService.getLists().subscribe(result => this.lists = result);
  }

}
