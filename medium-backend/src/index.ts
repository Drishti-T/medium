import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { adminRouter } from './routes/admin'
import { cors } from 'hono/cors' 
// import bcrypt from 'bcrypt'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()



app.use('/*', cors());
app.route("/api/v1/user" , userRouter);
app.route("/api/v1/admin" , adminRouter);
app.route("/api/v1/blog" , blogRouter);




app.get('/h', (c) => {
  console.log("hello");
  return c.text("hello")
});


export default app
