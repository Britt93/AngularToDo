import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
//import { resourceLimits } from 'worker_threads';
import { ItemService } from '../item.service';
import { List } from '../list';
import { ListService } from '../list.service';

import {Location} from '@angular/common';



@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  itemId: number = 0;
  isAdd: boolean = false;
  isEdit: boolean = false;

  isSubmitted: boolean = false;
  errorMessage: string = '';

  postItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();
  item$: Subscription = new Subscription();

  itemForm = new FormGroup({
    id: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    date: new FormControl(''),
    listId: new FormControl('', [Validators.required]),
    order: new FormControl('', [Validators.required]),
    isDone: new FormControl('', [Validators.required]),
  });
  lists$: Subscription = new Subscription();
  lists: List[] = [];



  constructor(private router: Router, private route: ActivatedRoute, private itemService: ItemService, private listService: ListService, private _location: Location) {
    this.isAdd = this.router.url === '/newitem';
    this.isEdit = !this.isAdd;
  }




  ngOnInit(): void {
    //edit
    if (this.isEdit) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id != null) {
        this.itemId = +id;
        this.itemService.getItemById(+id).subscribe(result => {
          this.itemForm.patchValue({
            id: result.id,
            description: result.description,
            date: result.date,
            listId: result.listId,
            order: result.order,
            isDone: result.isDone,
          });
        });

      }
    }
    //add
    else {
      this.itemForm.patchValue({
        order: 20,
        isDone: false,
      });
    }

    // get lists
    this.lists$ = this.listService.getLists().subscribe(result => {
      this.lists = result;
    });
  }

  ngOnDestroy(): void {
    this.postItem$.unsubscribe();
    this.putItem$.unsubscribe();
    this.item$.unsubscribe();
  }

  getTitle(): string {
    if (this.isAdd) {
      return 'Add new item';
    } else {
      return 'Edit item';
    }
  }

  onSubmit() {
    //this.isSubmitted = true;
    if (this.isAdd) {
      //add
      this.postItem$ = this.itemService.postItem(this.itemForm.value).subscribe(result => {

        //all went well
        //this.router.navigateByUrl("/");
        this._location.back();
      },
        error => {
          this.isSubmitted = false;
          this.errorMessage = error.message;
        });
    }
    //edit
    else {
      this.putItem$ = this.itemService.putItem(this.itemId, this.itemForm.value).subscribe(result => {
        //all went well
        //this.router.navigateByUrl("/");
        this._location.back();
      },
        error => {
          this.isSubmitted = false;
          this.errorMessage = error.message;
        });
    }
  }

}
