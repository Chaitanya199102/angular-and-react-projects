import { TestBed } from '@angular/core/testing';

import { AppPublisherService } from './app-publisher.service';

describe('AppPublisherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppPublisherService = TestBed.get(AppPublisherService);
    expect(service).toBeTruthy();
  });
});
