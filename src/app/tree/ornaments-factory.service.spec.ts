import { TestBed } from '@angular/core/testing';

import { OrnamentsFactoryService } from './ornaments-factory.service';

describe('OrnamentsFactoryService', () => {
  let service: OrnamentsFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrnamentsFactoryService],
    });
    service = TestBed.inject(OrnamentsFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
