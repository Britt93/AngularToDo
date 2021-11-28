import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ListComponent } from './list.component';
import { ListFormComponent } from './list-form/list-form.component';
import { ListService } from './list.service';
import { NgxColorsModule } from 'ngx-colors';
import { SharedModule } from '../shared/shared.module';
import { ItemModule } from '../item/item.module';




@NgModule({
  declarations: [
    ListComponent,
    ListFormComponent,
    ListDetailComponent
  ],
  imports: [
    //CommonModule,
    SharedModule,
    NgxColorsModule,
    ItemModule

  ],
  exports: [
    ListComponent,
    ListFormComponent,
    ListDetailComponent
  ],
  providers: [
    ListService
  ]
})
export class ListModule { }
