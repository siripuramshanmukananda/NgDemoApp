import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreTeam } from './core-team';

describe('CoreTeam', () => {
  let component: CoreTeam;
  let fixture: ComponentFixture<CoreTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreTeam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreTeam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
