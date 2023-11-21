import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IListComponent } from './IList.component';

describe('IListComponent', () => {
  let component: IListComponent;
  let fixture: ComponentFixture<IListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
