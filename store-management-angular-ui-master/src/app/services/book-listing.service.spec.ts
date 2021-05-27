import { TestBed } from '@angular/core/testing';

import { BookListingService } from './book-listing.service';

describe('BookListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookListingService = TestBed.get(BookListingService);
    expect(service).toBeTruthy();
  });
});
