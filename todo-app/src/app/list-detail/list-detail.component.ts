import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  list: List = {id: 0, name:"", category:""};

  constructor(private listService: ListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      const listId = this.route.snapshot.paramMap.get('id');
      if (listId != null) {
        let listTemp = this.listService.getListById(+listId) ?? null;
        if(listTemp != null) {
          this.list = listTemp;
        }
      }
  }

}
