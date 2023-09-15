import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWelcomeComponent } from './game-welcome.component';

describe('GameWelcomeComponent', () => {
  let component: GameWelcomeComponent;
  let fixture: ComponentFixture<GameWelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameWelcomeComponent]
    });
    fixture = TestBed.createComponent(GameWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
