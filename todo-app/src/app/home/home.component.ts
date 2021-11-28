import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import { List } from '../list/list';
import { ListService } from '../list/list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  lists: List[] = [];
  lists$: Subscription = new Subscription();
  deleteList$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private listService: ListService, private router: Router) { }

  ngOnInit(): void {
    this.getLists();
  }

  ngOnDestroy(): void {
    this.lists$.unsubscribe();
    this.deleteList$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['newlist']);
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['editlist/' + id]);
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
