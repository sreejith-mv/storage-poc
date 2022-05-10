import { TestBed } from '@angular/core/testing';
import { DatabaseEntityProvider } from './database-entity.provider';


describe('DatabaseEntityProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseEntityProvider<any> = TestBed.get(DatabaseEntityProvider);
    expect(service).toBeTruthy();
  });
});
