import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../item';

import { ItemService } from '../item.service';


@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  list: List = { id: 0, name: "", color: "" };

  items$: Observable<Item[]> = new Observable<Item[]>();
  constructor(private listService: ListService, private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const listId = this.route.snapshot.paramMap.get('id');
    console.log(listId);
    if (listId != null) {
      /*let listTemp = this.listService.getListById(+listId) ?? null;
      if(listTemp != null) {
        this.list = listTemp;
      }*/
      this.listService.getListById(+listId).subscribe(result => {
        this.list = result;
      }
      );


    }
  }

}
