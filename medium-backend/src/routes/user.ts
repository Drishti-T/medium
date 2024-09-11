import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { sign } from 'hono/jwt'
import { SignUpInput, SignInInput } from '@hellcat/medium-common'

// import bcrypt from 'bcrypt'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()


interface SignupRequestBody {
  name: string;
  username: string;
  password: string;
}
interface ErrorResponse {

  error: string | string[];
}
interface SignUpResponseBody {
  msg: string;
  jwt: string;
}

interface SigninInput {
  username: string;
  password: string;

}

// signup ___________________________________________________________

userRouter.post('/signup', async (c) => {

  console.log("hello");
  // a new account is created on a sign up page :
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json<SignupRequestBody>() // interface checking
  console.log(body);
  const { success } = SignUpInput.safeParse(body); // zod type checking
  // remember: safeParse method returns an object with success and error properties, not just a boolean success. If safeParse fails, you should handle the error property to provide more meaningful feedback.

  console.log({ success });
  if (!success) {
    c.status(411);
    return c.json({
      msg: "invalid inputs"
    })
  }

  //hash your password before storing
  // const hashedPassword = await bcrypt.hash(body.password, 10);
  // console.log(hashedPassword);
  try {
    const userAlreadyExist = await prisma.user.findFirst({
      where: {
        username: body.username
      }
    });
    if (userAlreadyExist) {
      return c.json({
        msg: "user already exits"
      })
    }
    const user = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        password: body.password
      }
    })
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET
    );
    return c.json<SignUpResponseBody>({
      msg: "user created successfully",
      jwt: jwt
    })
  } catch (error: unknown) {
    // for other  types  of errors , return  a generic error message
    return c.json<ErrorResponse>({
      error: 'An internal error occurred'
    }, 500);
  }
});



// _______________________________________
// a simple code
// _______________________________________

// userRouter.post('/api/v1/signup', async (c) => {
//   // user coming for the first time => signup
//   const body = await c.req.json();

//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate())

//   console.log(body);

//   try {
//     const user = await prisma.user.create({
//       data: {
//         email: body.email,
//         password: body.password
//       }
//     });

//     console.log(user);
//     const jwt = await sign({
//       id: user.id
//     }, c.env.JWT_SECRET);

//     return c.json({
//       msg: "user created successfully",
//       jwt: jwt
//     })


//   } catch (error) {

//     return c.json({
//       error: error
//     })
//   }

// });



// signin request

userRouter.post('/signin', async (c) => {
  try {

    // a new account is created on a sign up page :
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json<SigninInput>();
    console.log(body);

    const { success } = SignInInput.safeParse(body); // zod type checking
    console.log(success)
    if (success) {
      return c.json({
        msg: "success"
      })
    }
    else{
      return c.json({
        msg: "success failed"
      })
    }

  } catch (error) {
    return c.json({
      msg: "failed",
      error
    })

  }
})
 