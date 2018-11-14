'use strict';

const DEFAULT_OPTIONS = {
  'Content-Security-Policy': '',
  'Content-Security-Policy-Report-Only': '',
  'Referrer-Policy': '',
  'Strict-Transport-Security': 'max-age=15552000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': '',
  'X-XSS-Protection': '1; mode=block'
};

/**
 * UI-Security middleware
 *
 * @return {GeneratorFunction}
 */
module.exports = function getMiddleware(options) {
  options = Object.assign({}, DEFAULT_OPTIONS, options || {});

  let setHeaderFor = function(ctx, header) {
    let headerValue = options[header];
    if (headerValue) {
      ctx.set(header, headerValue);
    } else {
      ctx.remove(header);
    }
  };

  return async function uiSecurityMiddleware(ctx, next) {
    setHeaderFor(ctx, 'Content-Security-Policy');
    setHeaderFor(ctx, 'Content-Security-Policy-Report-Only');
    setHeaderFor(ctx, 'Referrer-Policy');
    setHeaderFor(ctx, 'Strict-Transport-Security');
    setHeaderFor(ctx, 'X-Content-Type-Options');
    setHeaderFor(ctx, 'X-Frame-Options');
    setHeaderFor(ctx, 'X-XSS-Protection');

    await next();
  };

};
