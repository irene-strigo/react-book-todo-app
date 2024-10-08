import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/web-extension";
import { getDatabase, ref, push, set, get, query } from "firebase/database";
import { remove } from "firebase/database";
export function del(user, key) {
  return remove(ref(getDatabase(), `/posts/users/${user.uid}/todos/${key}`), true)
}
export async function login(email, password) {
  try {
    const oUC = await signInWithEmailAndPassword(getAuth(), email, password);
    return oUC.user
  }
  catch (err) {
    return err.code
  }
}
export async function logout() {
  await signOut(getAuth());
}

export async function add(user, deed) {
  const oRef = await push(
    ref(
      getDatabase(),
      `posts/users/${user.uid}/todos`
    )
  );
  await set(oRef, deed);
  const oSnapshot = await get(query(oRef));
  const oDeed = oSnapshot.val();
  oDeed.key = oRef.key;
  return oDeed;
}

export async function getList(user) {
  const oSnapshot = await get(query(ref(getDatabase(), `/posts/users/${user.uid}/todos`)));
  const oArr = [];
  let oDeed;
  oSnapshot.forEach((oDoc) => {
    oDeed = oDoc.val();
    oDeed.key = oDoc.key;
    oArr.push(oDeed)
  });
  return oArr
}
export function setDone(user, key) {
  return set(ref(getDatabase(), `/posts/users/${user.uid}/todos/${key}/done`), true)
}