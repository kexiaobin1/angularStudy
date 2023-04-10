import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../service/student.service';
import {YzAsyncValidators} from '../../yz-async-validators';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {YzValidators} from '../../yz-validators';
import {Assert} from '@yunzhi/ng-mock-api';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  formGroup: FormGroup;
  id: number | undefined;
  constructor(private studentService: StudentService, private yzAsyncValidators: YzAsyncValidators,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required, yzAsyncValidators.numberNotExist()),
      phone: new FormControl('', YzValidators.phone),
      email: new FormControl(),
      clazzId: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log('路由发生了变化', params);
    });
    this.id = +this.activatedRoute.snapshot.params.id;
    console.log(this.id);
    Assert.isNumber(this.id, '接收的不正确');
    this.loadData(this.id);
  }
  onSubmit(id: number | undefined, formGroup: FormGroup): void {
    const formValue = formGroup.value as {
      name: string,
      phone: string,
      email: string,
      clazzId: number
    };
    Assert.isString(formValue.name, formValue.phone, formValue.email, '类型必须为字符串');
    Assert.isNumber(formValue.clazzId, '类型必须为number');
    this.studentService.update(id as number,  {
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone,
      clazz: {id: formValue.clazzId}
    }).subscribe(() => {
      console.log('更新成功');
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    });
  }
  loadData(id: number): void{
    this.studentService.getById(id).subscribe(
      student => {
        this.formGroup.setValue(
          {
            name: student.name,
            number: student.number,
            phone: student.phone,
            email: student.email,
            clazzId: student.clazz.id
          });
      });
  }

}
