import RouteBuilder from '../../framework/RouteBuilder';
import pageNotFound from './PageNotFound.vue';

window.addEventListener('add-routes', (e: CustomEvent) => {
  const routes = new RouteBuilder()
    .path('/:catchAll(.*)')
    .component(pageNotFound)
    .title('page-not-found-title')
    .build(false);
  e.detail.routes.splice(0, 0, ...routes);
});
