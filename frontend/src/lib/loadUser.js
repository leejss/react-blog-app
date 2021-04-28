import { check, tempSetUser } from '../modules/user';

export default function loadUser(store) {
  try {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (err) {
    console.error(err);
  }
}
