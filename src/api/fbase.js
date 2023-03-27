import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updateProfile,
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

// 이메일,비밀번호로 로그인
export async function createUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const { user } = userCredential;
            return user;
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                alert('같은 이메일주소의 계정이 존재합니다.');
            }
        });
}

export async function updateUserProfile(nickname, thumbnail, success) {
    return updateProfile(auth.currentUser, {
        displayName: nickname,
        photoURL: thumbnail,
    })
        .then(success)
        .catch(console.error);
}

export async function emailLogin(email, password, success) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(success)
        .catch(error => {
            if (error.code === 'auth/user-not-found') {
                alert('존재하지않는 회원입니다. 회원가입을 해주세요.');
                return;
            } else if (error.code === 'auth/wrong-password') {
                alert(
                    `아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다 입력하신 내용을 다시 확인해주세요.`,
                );
            }
            console.log(error.code);
        });
}

// google로 로그인
export async function googleLogin() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
        .then(res => {
            const { user } = res;
            return user;
        })
        .catch(console.error);
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

// 신상품 POST function
export async function postProducts(product, imageUrl) {
    const id = uuid();
    return set(ref(database, `products/${id}`), {
        ...product,
        id,
        image: imageUrl,
        productSizes: product.productSizes.split(','),
        productPrice: Number(product.productPrice),
    });
}

// 상품 리스트 GET function
export async function getProductsList() {
    return get(ref(database, `products`))
        .then(snapshot => {
            if (snapshot.exists()) {
                return Object.values(snapshot.val());
            }
            return [];
        })
        .catch(error => {
            console.error(error);
        });
}

// 장바구니 업데이트 function
export async function postMyCart(userId, product) {
    return set(ref(database, `carts/${userId}/${product.id}`), product);
}

// 장바구니 GET function
export async function getMyCart(userId) {
    return get(ref(database, `carts/${userId}`)).then(snapshot => {
        if (snapshot.exists()) {
            const result = Object.values(snapshot.val()) || [];
            return result;
        } else {
            return [];
        }
    });
}

// 장바구니 delete function
export async function deleteFromCart(userId, productId) {
    return remove(ref(database, `carts/${userId}/${productId}`));
}
