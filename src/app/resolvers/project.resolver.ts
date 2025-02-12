import {ResolveFn} from '@angular/router';

export const projectResolver: ResolveFn<{ title: string }> = (route, _) => {

  return {
    title: 'ddd'
  };
};
