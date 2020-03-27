import { TestBed } from '@angular/core/testing';

import { MamontsensorsService } from './mamontsensors.service';

describe('MamontsensorsService', () => {
  let service: MamontsensorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MamontsensorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
