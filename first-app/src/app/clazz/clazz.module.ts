import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add/add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {KlassSelectComponent} from './klass-select/klass-select.component';
import {ClazzComponent} from './clazz.component';
import {PageComponent} from './page/page.component';
import {EditComponent} from './edit/edit.component';
import {RouterModule, Routes} from '@angular/router';
import {PageModule} from './page/page.module';
import { LoadingModule } from '../directive/loading/loading.module';

const routes: Routes = [
  {
    path: '',
    component: ClazzComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  }
];

@NgModule({
  declarations: [AddComponent, KlassSelectComponent, ClazzComponent,  EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageModule,
    RouterModule.forChild(routes),
    LoadingModule
  ]
})
export class ClazzModule {
}
