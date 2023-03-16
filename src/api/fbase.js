import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// 로그인
export async function login() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
        .then(res => {
            const { user } = res;
            return user;
        })
        .catch(console.log);
}

// 로그아웃
export function logout() {
    signOut(auth).catch(console.error);
}

// 어드민인지 확인
async function checkIsAdm(user) {
    return get(ref(database, `admins`))
        .then(snapshot => {
            if (snapshot.exists()) {
                const admin = snapshot.val();
                const isAdmin = admin.includes(user.uid);
                return { ...user, isAdmin };
            }
        })
        .catch(error => {
            console.error(error);
        });
}
export async function loginStateChanged(callback) {
    onAuthStateChanged(auth, async user => {
        const updatedUserData = user ? await checkIsAdm(user) : null;
        callback(updatedUserData);
    });
}

export async function postProducts(data, success, error) {
    const id = uuid();
    return set(ref(database, `products/${id}`), { ...data.params, id, image: data.imageUrl })
        .then(success)
        .catch(error);
}
