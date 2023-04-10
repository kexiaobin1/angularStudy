import {Component, OnInit} from '@angular/core';
import {Page} from '../entity/page';
import {Clazz} from '../entity/clazz';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Confirm} from 'notiflix';

@Component({
  selector: 'app-clazz',
  templateUrl: './clazz.component.html',
  styleUrls: ['./clazz.component.css']
})
export class ClazzComponent implements OnInit {
  // 默认显示第1页的内容
  page = 0;

  // 每页默认为3条
  size = 6;

  // 初始化一个有0条数据的
  pageData = new Page<Clazz>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.loadByPage();
  }

  onPage(page: number): void {
    this.loadByPage(page);
  }

  loadByPage(page = 0): void {
    const httpParams = new HttpParams().append('page', page.toString())
      .append('size', this.size.toString());
    console.log('执行参数' + httpParams);
    this.httpClient.get<Page<Clazz>>('/clazz/page', {params: httpParams})
      .subscribe(pageData => {
        // 在请求数据之后设置当前页
        this.page = page;
        this.pageData = pageData;
        console.log(pageData);
      });
  }
  onDelete(index: number, clazzId: number): void {
    console.log('onDelete called', index, clazzId);
    Confirm.show('请确认', '此操作不可逆', '确认', '取消',
      () => this.httpClient.delete<void>('/clazz/' + clazzId.toString())
        .subscribe(() => {
          console.log('删除成功');
          this.pageData.content.splice(index, 1);
        }, error => console.log('删除失败', error)), () => console.log('cancal'));
    }
}
