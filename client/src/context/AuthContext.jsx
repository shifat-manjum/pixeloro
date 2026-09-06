import { createContext, useContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider, appleProvider } from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('pixeloro_master_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function loginWithGoogle() {
        return signInWithPopup(auth, googleProvider);
    }

    function loginWithApple() {
        return signInWithPopup(auth, appleProvider);
    }

    function loginAsMasterAdmin(customEmail = 'khshifatmanjum@gmail.com') {
        const masterUser = {
            uid: 'master_shifat_admin',
            email: customEmail,
            displayName: 'KH Shifat Manjum',
            isAdmin: true
        };
        setUser(masterUser);
        localStorage.setItem('pixeloro_master_user', JSON.stringify(masterUser));
        return masterUser;
    }

    async function logout() {
        localStorage.removeItem('pixeloro_master_user');
        setUser(null);
        try {
            await signOut(auth);
        } catch (e) {}
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                const saved = localStorage.getItem('pixeloro_master_user');
                if (saved) {
                    setUser(JSON.parse(saved));
                } else {
                    setUser(null);
                }
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        signup,
        login,
        loginWithGoogle,
        loginWithApple,
        loginAsMasterAdmin,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
