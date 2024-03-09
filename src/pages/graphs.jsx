import { userStore } from '../store/user';

export default function Home() {


  return <div>Testing graphs!{userStore.getState().username}</div>;
}