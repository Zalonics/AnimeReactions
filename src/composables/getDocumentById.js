import { db } from "@/firebase/config.js"
import { doc, getDoc } from "firebase/firestore"

/**
 *
 * @param {String} id
 * @returns {Promise<Object>}
 */
const useGetDocById = async (id) => {
    const docRef = doc(db, `reactions/${id}`)
    const docSnap = await getDoc(docRef)
    let docData = docSnap.data()
    return docData
}

export { useGetDocById }
