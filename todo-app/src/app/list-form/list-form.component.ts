import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from '../list';
import { ListService } from '../list.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit, OnDestroy {

  isAdd: boolean = false;
  isEdit: boolean = false;
  listId: number = 0;

  //list: List = { id: 0, name: "", color:"" };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  //list$: Subscription = new Subscription();
  postList$: Subscription = new Subscription();
  putList$: Subscription = new Subscription();

  // reactive form
  listForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private route: ActivatedRoute, private listService: ListService) {
    this.isAdd = this.router.url === '/newitem';
    this.isEdit = !this.isAdd;

  }

  ngOnInit(): void {


    // get article if in edit
    if (this.isEdit) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id != null) {
        this.listId = +id;
        this.listService.getListById(+id).subscribe(result => {
          this.listForm.patchValue({
            id: result.id,
            name: result.name,
            color: result.color
          });
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.postList$.unsubscribe();
    this.putList$.unsubscribe();
  }

  getTitle(): string {
    if (this.isAdd) {
      return 'Add new list';
    } else {
      return 'Edit list';
    }
  }
  
  onSubmit() {
    //this.isSubmitted = true;
    if (this.isAdd) {
      //add
      this.postList$ = this.listService.postList(this.listForm.value).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/");
              },
              error => {
                this.isSubmitted = false;
                this.errorMessage = error.message;
              });
    }
    //edit
    //if (this.isEdit) {
      else{
      this.putList$ = this.listService.putList(this.listId, this.listForm.value).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/");
              },
              error => {
                this.isSubmitted = false;
                this.errorMessage = error.message;
              });
    }

  }

}

