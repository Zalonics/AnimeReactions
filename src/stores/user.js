import { defineStore } from 'pinia'
import { auth } from '@/firebase/config'
import { useCollection } from '@/composables/getCollection'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { addDoc, collection, query, where } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null, //Firebase Obj
        userName: '',
        userId: '',
        favorites: [], //  Array of Reaction ID's
        uploads: [], //  Array of Reaction ID's
    }),
    getters: {},
    actions: {
        setUser(user) {
            this.user = user
            console.log('User state changed: ', this.user)
        },

        setUserInfo({ userName, userId }) {
            this.userName = userName
            this.userId = userId
        },

        async setUserId() {
            const colRef = collection(db, 'users')
            const q = await query(colRef, where('userName', '==', 'lulu'))
            console.log(q)
        },

        async fetchFavorites() {
            const users = await useCollection('users')
            this.favorites = users
                .filter((user) => {
                    return user.userName === this.userName
                })
                .map((userObj) => Object.values(userObj.favorites)[0])
        },

        async fetchMyUploads() {
            const users = await useCollection('users')
            this.uploads = users
                .filter((user) => {
                    return user.userName === this.userName
                })
                .map((userObj) => Object.values(userObj.uploads)[0])
        },

        async signUp({ email, password }) {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            if (res) {
                this.setUser({ email, password })
                // Query for User associated with email
            } else {
                throw new Error('Could not complete signup')
            }
        },

        async registerUserName(username, email) {
            const users = await useCollection('users')
            const userNameList = users.map((user) =>
                user.userName.toLowerCase()
            )

            let isExisting = false

            if (userNameList.includes(username.toLowerCase())) {
                isExisting = true
            }

            // Check if username already exists
            if (isExisting) {
                alert('Username already exists')
                return false
            }

            // Add Doc if username doesn't already exist
            const colRef = collection(db, 'users')
            await addDoc(colRef, {
                favorites: [],
                uploads: [],
                userName: username,
                email,
            })

            this.userName = username
            return true
        },

        async login({ email, password }) {
            const res = await signInWithEmailAndPassword(auth, email, password)
            if (res) {
                this.setUser({ email, password })
                const users = await useCollection('users')
                const userObj = users.filter((obj) => {
                    return obj.email === email
                })
                if (userObj.length > 0) {
                    this.userName = userObj.userName
                    this.setUserId()
                }
            } else {
                throw new Error('Could not complete login')
            }
        },

        async logout() {
            await signOut(auth)
            this.setUser(null)
        },
    },
})
