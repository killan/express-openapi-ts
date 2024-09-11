import { MakeApp } from "./makeApp";
import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT || 3000

MakeApp.make()
    .then(app => app.listen(port))
    .then(() => {
        console.log(`[server]: Server is running at http://localhost:${port}`)
    })
    .catch(err => {
        console.error('Caught error', err)
    })
