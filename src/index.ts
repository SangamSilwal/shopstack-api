import express , {Express,Response,Request} from "express"
import { PORT } from "./confidential"
import rootRouter from "./routes"
import {PrismaClient} from "@prisma/client"
import { errorMiddleware } from "./middleware/errors"
import { SignupSchema } from "./schema/users"



const app:Express = express()

app.use(express.json())
app.use('/api',rootRouter);
export const prismaClient = new PrismaClient(
    {
        log:['query']
    }
)
// .$extends({
//     query:{
//         user:{
//             //This allows us to intercept the creation of a user 
//             //before it hit the dataBase
//             //Here we are overriding the create operation on the user model
//             create({args,query}) {
//                 args.data = SignupSchema.parse(args.data)
//                 return query(args)
//             }
//         }
//     }
// })

app.use(errorMiddleware)
app.listen(PORT, () => {
    console.log("App working")
})