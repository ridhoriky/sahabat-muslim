import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { FaGoogle } from 'react-icons/fa';

function SignInwithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: '',
        });
        window.location.href = '/';
      }
    });
  }
  return (
    <div>
      <div
        className='my-5 flex justify-center cursor-pointer '
        onClick={googleLogin}
      >
        <FaGoogle />
      </div>
    </div>
  );
}
export default SignInwithGoogle;
