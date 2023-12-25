import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TreeUsecaseService } from './tree-usecase.service';

describe('TreeUsecaseService', () => {
  let service: TreeUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TreeUsecaseService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    service = TestBed.inject(TreeUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
