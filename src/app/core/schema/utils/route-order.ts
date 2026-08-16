export const ROUTE_ORDER = [
  'home',
  'about',
  'projects',
  'newsletter',
  'contact',
  'admin'
] as const;

export type RouteKey = typeof ROUTE_ORDER[number];

export function routeAnimationIndex(route: RouteKey): number {
  return ROUTE_ORDER.indexOf(route);
}