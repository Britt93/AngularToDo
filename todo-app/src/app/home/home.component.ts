import { Component, OnDestroy, OnInit } from '@angular/core';
import { List } from '../list';
import { ListService } from '../list.service';
import { Observable, Subscription } from 'rxjs';

import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  //pre-crud
  //lists$: Observable<List[]> = new Observable<List[]>();

  lists: List[] = [];
  lists$: Subscription = new Subscription();
  deleteList$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private listService: ListService, private router: Router) { }

  ngOnInit(): void {
    // pre-crud
    //this.lists$ = this.listService.getLists();
    this.getLists();
  }

  ngOnDestroy(): void {
    this.lists$.unsubscribe();
    this.deleteList$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['list/form'], {state: {mode: 'add'}});
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
