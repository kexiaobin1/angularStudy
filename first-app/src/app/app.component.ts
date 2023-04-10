import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Confirm} from 'notiflix';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // 初始化教师数组
  teachers = [] as Teacher[];

  constructor(private httpClient: HttpClient) {
    console.log(httpClient);
  }

  /**
   * 组件初始化完成后将被自动执行一次
   */
  ngOnInit(): void {
    this.httpClient.get<Teacher[]>('/teacher')
      .subscribe(teachers => this.teachers = teachers);
  }
  onDelete(id: number): void {
    const url = `/teacher/${id}`;
    Confirm.show('请确认', '此操作不可逆', '确认', '取消',
      () => {
        this.httpClient.delete(url)
          .subscribe(() => this.ngOnInit(),
            error => console.log('删除失败', error));
      }, () => console.log('取消') );
  }
}

/**
 * 定义一个类型
 */
type Teacher = {
  id: number,
  name: string,
  username: string,
  email: string,
  sex: true
};
