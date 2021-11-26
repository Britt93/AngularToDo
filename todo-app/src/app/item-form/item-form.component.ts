import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

 //listId: number = 0;
 //OF
 //list: List = ...;

 @Input() listId!:number;

  itemId: number = 0;
  isAdd: boolean = false;
  isEdit: boolean = false;

  isSubmitted: boolean = false;
  errorMessage: string = '';

  postItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();

  itemForm = new FormGroup({
    id: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    listId: new FormControl('', [Validators.required]),
    order: new FormControl('', [Validators.required]),
    isDone: new FormControl('', [Validators.required]),
  });



  constructor(private router: Router, private route: ActivatedRoute, private itemService: ItemService,) {
    this.isAdd = this.router.url === '/newitem';
    this.isEdit = !this.isAdd;
  }

  ngOnInit(): void {

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
            order: 20,
            isDone: false,
          });
        });
        
      }
    }
    //add
    else{
      this.itemForm.patchValue({
        //listId: 1,
        order: 20,
        isDone: false,
      });
    }
  }

  ngOnDestroy(): void {
    this.postItem$.unsubscribe();
    this.putItem$.unsubscribe();
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
        this.router.navigateByUrl("/");
        //this.back();
      },
        error => {
          this.isSubmitted = false;
          this.errorMessage = error.message;
        });
    }
    //edit
    //if (this.isEdit) {
    else {
      this.putItem$ = this.itemService.putItem(this.itemId, this.itemForm.value).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/");
        //this.back();
      },
        error => {
          this.isSubmitted = false;
          this.errorMessage = error.message;
        });
    }
  }

}
