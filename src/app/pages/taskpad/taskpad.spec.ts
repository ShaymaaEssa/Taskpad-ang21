import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taskpad } from './taskpad';

describe('Taskpad', () => {
  let component: Taskpad;
  let fixture: ComponentFixture<Taskpad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taskpad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Taskpad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
