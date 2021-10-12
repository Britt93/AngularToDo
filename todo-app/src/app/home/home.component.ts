import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { ListService } from '../list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lists: List[] = [];

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.lists = this.listService.getLists();
  }

}
