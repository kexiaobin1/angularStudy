import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add/add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClazzSelectModule} from '../clazz/clazz-select/clazz-select.module';
import { StudentComponent } from './student.component';
import {RouterModule, Routes} from '@angular/router';
import {LoadingModule} from '../directive/loading/loading.module';
import {PageModule} from '../clazz/page/page.module';
import {StudentRoutingModule} from './student-routing.module';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [AddComponent, StudentComponent, EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClazzSelectModule,
    StudentRoutingModule,
    LoadingModule,
    PageModule
  ]
})
export class StudentModule{
}
