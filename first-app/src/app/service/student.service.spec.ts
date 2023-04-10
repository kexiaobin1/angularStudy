import { TestBed } from '@angular/core/testing';

import { StudentService } from './student.service';
import {MockApiTestingModule} from '../mock-api/mock-api-testing.module';
import {HttpClient} from '@angular/common/http';
import {getTestScheduler} from 'jasmine-marbles';
import {randomNumber} from '@yunzhi/ng-mock-api';
import {randomString} from '@yunzhi/ng-mock-api/testing';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockApiTestingModule
      ]
    });
    service = TestBed.inject(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    console.log('服务');
    const httpClient = TestBed.inject(HttpClient);
    httpClient.post('/student', {}).subscribe( success => console.log('success', success),
      error => console.log('error', error));
  });
  it('StudentService', () => {
    const called = false;
    service.pageOfCurrentTeacher({page: 1, size: 2}).subscribe(
      data => {
        expect(data.number).toBe(1);
        expect(data.size).toBe(2);
      });
    getTestScheduler().flush();
    expect(called).toBeTrue();
  });
  it('delete', () => {
    const id = Math.floor(Math.random() * 10);
    console.log('测试的Id' + id);
    let called = false;
    service.delete(id).subscribe(() => {
      called = true;
    });
    // 由于HTTP请求是异步的，所以在短时间内还没有返回数据，called值仍然为false
    expect(called).toBeFalse();
    getTestScheduler().flush();
    expect(called).toBeTrue();
  });
  it('batchDelete', () => {
    const ids = [1, 2, 3];
    let called = false;
    service.batchDelete(ids).subscribe(() => {
      called = true;
    });
    expect(called).toBeFalse();
    getTestScheduler().flush();
    expect(called).toBeTrue();
  });
  it('getId', () => {
    getTestScheduler().flush();
    const id = randomNumber();
    let called = false;
    service.getById(id).subscribe(student => {
      called = true;
      expect(student).toBeTruthy();
    });
    expect(called).toBeFalse();
    getTestScheduler().flush();
    expect(called).toBeTrue();
  });
  it('update', () => {
    getTestScheduler().flush();
    const id = randomNumber();
    let called = false;
    service.update(id, {
      name: randomString(),
      email: randomString(),
      phone: randomString(),
      clazz: {id: randomNumber()}}).subscribe(student => {
              called = true;
              expect(student).toBeTruthy();
    });
    expect(called).toBeFalse();
    console.log('修改成功');
    getTestScheduler().flush();
    expect(called).toBeTrue();
  });
});
