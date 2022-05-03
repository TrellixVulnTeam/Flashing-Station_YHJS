import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QipcheckviewComponent } from './qipcheckview.component';

describe('QipcheckviewComponent', () => {
  let component: QipcheckviewComponent;
  let fixture: ComponentFixture<QipcheckviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QipcheckviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QipcheckviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
