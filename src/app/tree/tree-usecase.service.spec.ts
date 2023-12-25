import { TestBed } from '@angular/core/testing';
import { TreeUsecaseService } from './tree-usecase.service';

describe('TreeUsecaseService', () => {
  let service: TreeUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeUsecaseService],
    });
    service = TestBed.inject(TreeUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
