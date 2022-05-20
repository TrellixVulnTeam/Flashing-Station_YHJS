import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckForNewVersionComponent } from './check-for-new-version.component';

describe('CheckForNewVersionComponent', () => {
  let component: CheckForNewVersionComponent;
  let fixture: ComponentFixture<CheckForNewVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckForNewVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckForNewVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
