import { db } from "../firebase/config"
import { collection, getDocs } from "firebase/firestore"

const useCollection = (_collection) => {
    const reactionsRef = collection(db, _collection)
    const docs = getDocs(reactionsRef).then((snapshot) => {
        let docs = []
        snapshot.docs.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id })
        })
        return docs
    })
    return docs
}

export { useCollection }
