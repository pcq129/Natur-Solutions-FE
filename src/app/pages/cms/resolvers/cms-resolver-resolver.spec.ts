import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { cmsResolverResolver } from './cms-resolver-resolver';
import { ICms } from '../interfaces';

describe('cmdResolverResolver', () => {
  const executeResolver: ResolveFn<ICms> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => cmsResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
