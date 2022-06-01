import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyDgtrVBBjSHJb5zxGypGi5d_JblK2PWnNs',
    authDomain: 'anime-reactions.firebaseapp.com',
    projectId: 'anime-reactions',
    storageBucket: 'anime-reactions.appspot.com',
    messagingSenderId: '95602795996',
    appId: '1:95602795996:web:6a48b675f98502d2a81b19',
}

initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

export { auth, db }
