import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext,useEffect,useState } from "react";
import app from "../../Firebase/Firebase.config";

export  const AuthContext = createContext()
const auth = getAuth(app) ;


const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null) ;

    // create user account by email 
    const CreateUserByEmail = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword (auth , email , password)
    }

    const SignUpWithGoogle = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const LogInWithEmail = (email, password) => {
        setLoading(true)
        signInWithEmailAndPassword(auth,email,password)
    }

    const  ResetPassword = (email) => {
        setLoading(true)
      sendPasswordResetEmail(auth,email)   
    }

    const sendEmailForVerify = () => {
        setLoading(true)
        sendEmailVerification(user)
    }
    const LogOut = (auth) => {
        setLoading(true)
        signOut(auth)
    }

    const authInfo = {
        CreateUserByEmail,
        SignUpWithGoogle,
        LogInWithEmail,
        ResetPassword,
        sendEmailForVerify,
        LogOut,
        user,
        loading
    }


    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false)
            setUser(currentUser)
        } )
        return ()=> unsubscribe()
     }, [])
     


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
 