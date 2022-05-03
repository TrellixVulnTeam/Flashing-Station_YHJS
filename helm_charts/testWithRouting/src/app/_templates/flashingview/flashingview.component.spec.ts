import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashingviewComponent } from './flashingview.component';

describe('FlashingviewComponent', () => {
  let component: FlashingviewComponent;
  let fixture: ComponentFixture<FlashingviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashingviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashingviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
