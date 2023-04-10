import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {MockApiTestingModule} from '../../mock-api/mock-api-testing.module';
import {getTestScheduler} from 'jasmine-marbles';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClazzSelectModule} from '../../clazz/clazz-select/clazz-select.module';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComponent],
      imports: [
        MockApiTestingModule,
        RouterModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ClazzSelectModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id: '13'}}}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  fit('onSubmit', () => {
    getTestScheduler().flush();
    fixture.autoDetectChanges();
    component.onSubmit(component.id as number, component.formGroup);
    getTestScheduler().flush();
  });
  /**
   * 每个测试用例执行结束后，都执行一次此方法
   */
  afterEach(() => {
    // 发送尚未发送的数据，可以避免两次相近执行的单元测试不互相影响
    getTestScheduler().flush();
    // 统一调用自动检测功能
    fixture.autoDetectChanges();
  });
});
