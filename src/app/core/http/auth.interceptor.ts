import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';

import {AuthStore} from '../auth/auth.store';

/**
 * Interceptor que añade el token JWT a todas las peticiones HTTP.
 * Lee el token del AuthStore y lo pone en el header Authorization.
 */
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authStore = inject(AuthStore);
  const session = authStore.session();

  // Si hay sesión con token, añadir el header Authorization
  if (session?.token) {
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    return next(clonedRequest);
  }

  return next(request);
};
