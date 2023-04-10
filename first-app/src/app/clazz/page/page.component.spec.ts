import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageComponent} from './page.component';
import {Page} from '../../entity/page';
import {By} from '@angular/platform-browser';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.page = new Page<any>({
      content: [],
      number: 1,
      size: 20,
      numberOfElements: 30
    });
    fixture.autoDetectChanges();
  });

  it('0页', () => {
    component.page = new Page<any>({
      content: [],
      number: 0,
      size: 20,
      numberOfElements: 0
    });
    fixture.detectChanges();
    const navHtml = fixture.debugElement.query(By.css('nav')).nativeElement as HTMLElement;
    expect(navHtml.style.visibility).toEqual('hidden');
  });

  it('1页', () => {
    component.page = new Page<any>({
      content: [],
      number: 0,
      size: 20,
      numberOfElements: 10
    });
    fixture.detectChanges();
    const navHtml = fixture.debugElement.query(By.css('nav')).nativeElement as HTMLElement;
    expect(navHtml.style.visibility).toEqual('hidden');
  });

  it('2页', () => {
    component.page = new Page<any>({
      content: [],
      number: 0,
      size: 20,
      numberOfElements: 25
    });
    fixture.detectChanges();
    const navHtml = fixture.debugElement.query(By.css('nav')).nativeElement as HTMLElement;
    expect(navHtml.style.visibility).toEqual('visible');
  });

  it('将总页数的最大控制在第7页', () => {
    component.page = {
      number: 8,
      size: 20,
      totalPages: 18,
    } as Page<any>;
    fixture.detectChanges();
  });


  it('7 8 9 [10] 11 12 13`', () => {
    component.page = {
      number: 9,
      size: 20,
      totalPages: 18
    } as Page<any>;
    fixture.detectChanges();
    // 共显示7页
    expect(component.pages.length).toBe(7);
    expect(component.pages[0]).toBe(6);
    expect(component.pages.pop()).toBe(12);
  });

});
