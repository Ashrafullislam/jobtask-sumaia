import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext,useState } from "react";
import app from './../../firebase.config'; 

export  const AuthContext = createContext()
const auth = getAuth(app) ;


const AuthProvider = ({children}) => {
 
    const [user, setUser] = useState(null) ;
    const [loading, setLoading] = useState(false)

    // create user account by email 
    const CreateUserByEmail = (email,password) => {
        return createUserWithEmailAndPassword (auth , email , password)
    }

    const SignUpWithGoogle = (provider) => {
        return signInWithPopup(auth, provider)
    }

    const LogInWithEmail = (email, password) => {
        signInWithEmailAndPassword(auth,email,password)
    }

    const LogOut = (auth) => {
        signOut(auth)
    }

    const authInfo = {
        CreateUserByEmail,
        SignUpWithGoogle,
        LogInWithEmail,
        LogOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
 