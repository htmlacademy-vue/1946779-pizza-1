export default function isAdmin({ next, store, nextMiddleware }) {
  if (!store.state.Auth.user) {
    next('/');
  }
  return nextMiddleware();
}
