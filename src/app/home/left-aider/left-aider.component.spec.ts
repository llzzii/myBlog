import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftAiderComponent } from './left-aider.component';

describe('LeftAiderComponent', () => {
  let component: LeftAiderComponent;
  let fixture: ComponentFixture<LeftAiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftAiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftAiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
