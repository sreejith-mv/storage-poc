import { TestBed } from '@angular/core/testing';
import { EncryptionKeyProvider } from './encryption-key.service';


describe('EncryptionKeyProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncryptionKeyProvider = TestBed.get(EncryptionKeyProvider);
    expect(service).toBeTruthy();
  });
});
