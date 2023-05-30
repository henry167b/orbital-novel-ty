import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

function useProtectedRoute(user) {
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = segments[0] === "(auth)"; 
        if (!user && !inAuthGroup) {
            router.replace("/login");
        } else if (user && inAuthGroup) {
            router.replace("/");
        }
    }, [user, segments, router]);
}

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    useProtectedRoute(user);

    return (
      <AuthContext.Provider
        value={{
          signIn: (user, password) => { 
            setUser(user);
            setPassword(password)
            },
          signOut: () => { 
            setUser(null);
            setPassword(null)
            },
          user,
          password }}>
          {props.children}
      </ AuthContext.Provider>
    );
}