import { NgModule } from '@angular/core';
import { ItemComponent } from './item.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemService } from './item.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ItemComponent,
    ItemFormComponent
  ],
  imports: [
    SharedModule
  
  ],
  exports: [
    ItemComponent,
    ItemFormComponent
  ],
  providers: [
    ItemService
  ]
})
export class ItemModule { }
