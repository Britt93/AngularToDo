import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ListComponent } from './list/list.component';
import { ListFormComponent} from './list-form/list-form.component'
import { ItemFormComponent } from './item-form/item-form.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'list/:id', component: ListDetailComponent },
  { path: 'newlist', component: ListFormComponent },
  { path: 'editlist/:id', component: ListFormComponent},
  { path: 'newitem/:listId', component: ItemFormComponent},
  { path: 'edititem/:id', component: ItemFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
