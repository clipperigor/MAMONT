import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourcesContentComponent } from './cources-content.component';

describe('CourcesContentComponent', () => {
  let component: CourcesContentComponent;
  let fixture: ComponentFixture<CourcesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourcesContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourcesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
