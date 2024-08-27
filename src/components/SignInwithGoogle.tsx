import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type props = {
  text: string;
};

function SignInwithGoogle(props: props) {
  const navigate = useNavigate();
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      console.log(result);
      if (result.user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          photo: user.photoURL,
          saveSetting: {},
        });
        if (result.operationType === 'signIn') {
          localStorage.setItem('acsesToken', result?.user?.refreshToken);
          localStorage.setItem('isAuth', 'true');
          localStorage.setItem('user', result?.user?.uid);

          navigate('/');
          window.location.reload();
        }
      }
    });
  }
  return (
    <div>
      <div
        className='my-5 flex flex-wrap justify-center cursor-pointer '
        onClick={googleLogin}
      >
        <p className='w-full text-center pb-2'>
          {props.text} Menggunakan Google
        </p>
        <FaGoogle />
      </div>
    </div>
  );
}
export default SignInwithGoogle;
