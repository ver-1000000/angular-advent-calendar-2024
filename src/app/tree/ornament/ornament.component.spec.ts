import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrnamentComponent } from './ornament.component';
import { Ornament } from './ornament';

const ORNAMENT_MOCK = new Ornament({
  type: 'circle',
  x: '0',
  y: '0',
  icon: 'https://example.com',
  article: {
    author: 'author',
    title: 'title',
    url: 'https://example.com',
    day: 1,
  },
});

describe('OrnamentComponent', () => {
  let component: OrnamentComponent;
  let fixture: ComponentFixture<OrnamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrnamentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrnamentComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('ornament', ORNAMENT_MOCK);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
