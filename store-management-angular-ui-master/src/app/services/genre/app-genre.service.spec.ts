import { TestBed } from '@angular/core/testing';

import { AppGenreService } from './app-genre.service';

describe('AppGenreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppGenreService = TestBed.get(AppGenreService);
    expect(service).toBeTruthy();
  });
});
