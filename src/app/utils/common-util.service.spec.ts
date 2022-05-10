import { TestBed } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { ITestingModuleConfig, TestingUtils } from '../../test';
import { PlatformMock } from '../mocks/platform.mock';

import { CommonUtilService } from './common-util.service';

describe('CommonUtilService', () => {
  let service: CommonUtilService;
  const config: ITestingModuleConfig = {
    components: [],
    providers: [
      {
        provide: Platform,
        useValue: PlatformMock,
      }
    ],
    imports: []
  };

  beforeEach(() => {
    TestingUtils.beforeEachCompiler(config);
    service = TestBed.inject(CommonUtilService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check is device', async () => {
    const spy = spyOn(service, 'isDevice').and.callThrough();

    service.isDevice();
    expect(spy).toHaveBeenCalled();
  });


  it('should return a new random key', async () => {
    const spy = spyOn(service, 'getKey').and.callThrough();
    service.getKey();
    expect(spy).toHaveBeenCalled();
  });

});
