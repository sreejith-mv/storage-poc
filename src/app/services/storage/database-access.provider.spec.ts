import { TestBed } from '@angular/core/testing';
import { DatabaseAccessProvider } from './database-access.provider';
import { DatabaseEntityProvider } from './database-entity.provider';


describe('DatabaseAccessProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseAccessProvider = TestBed.get(DatabaseAccessProvider);
    expect(service).toBeTruthy();
  });
});
