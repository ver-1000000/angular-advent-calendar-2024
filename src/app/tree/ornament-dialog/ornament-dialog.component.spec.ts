import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrnamentDialogComponent } from './ornament-dialog.component';
import { DIALOG_DATA } from '@angular/cdk/dialog';

describe('OrnamentDialogComponent', () => {
  let component: OrnamentDialogComponent;
  let fixture: ComponentFixture<OrnamentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: DIALOG_DATA, useValue: {} }],
      imports: [OrnamentDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrnamentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
