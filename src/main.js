import { createApp } from "vue"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
import { dom } from "@fortawesome/fontawesome-svg-core"
library.add(fas)
library.add(fab)
library.add(far)
dom.watch()

import { createPinia } from "pinia"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/config"

import globalCss from "@/assets/global.scss"
import router from "@/router.js"
import App from "@/App.vue"

let app

onAuthStateChanged(auth, (user) => {
    console.log("auth state change", user)
    if (!app) {
        app = createApp(App)
        app.component("font-awesome-icon", FontAwesomeIcon)
        app.use(createPinia())
        app.use(router)
        app.use(globalCss)
        app.mount("#app")
    }
})
