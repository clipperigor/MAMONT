import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MamontComponent } from './mamont.component';

describe('MamontComponent', () => {
  let component: MamontComponent;
  let fixture: ComponentFixture<MamontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MamontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MamontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
