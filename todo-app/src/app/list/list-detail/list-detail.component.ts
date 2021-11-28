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
  list: List = { id: 0, name: "", color: "" };

  constructor(private listService: ListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const listId = this.route.snapshot.paramMap.get('id');
    console.log(listId);
    if (listId != null) {
      this.listService.getListById(+listId).subscribe(result => {
        this.list = result;
      }
      );
    }
  }
}
