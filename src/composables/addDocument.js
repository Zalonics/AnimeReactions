import { addDoc } from "@firebase/firestore"

const useAddDocument = async (colRef, data) => {
    addDoc(colRef, {
        ...data,
    })
}
