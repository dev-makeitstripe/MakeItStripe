import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestimonyComponent } from './add-testimony.component';

describe('AddTestimonyComponent', () => {
  let component: AddTestimonyComponent;
  let fixture: ComponentFixture<AddTestimonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTestimonyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTestimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
