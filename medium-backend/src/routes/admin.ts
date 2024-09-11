import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { sign } from 'hono/jwt'
import { SignInInput, SignUpInput } from '@hellcat/medium-common'


// admin routes
export const adminRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

interface SignupRequestBody {
    name: string;
    username: string;
    password: string;
}

interface SignUpResponseBody {

    msg: string;
    jwt: string;
}

interface ErrorResponse {
    error: string | string[];
}

// signup for admin (new admin acc)

adminRouter.post('/signup', async (c) => {

    // a new admin account is created on a sign up page :
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // we need to get body from context
    const body = await c.req.json<SignupRequestBody>()

    const { success } = SignUpInput.safeParse(body);

    if (!success) {
        c.status(404);
        return c.json({
            msg: "invalid inputs"
        })
    }

    //hash ur password before storing
    // const hashedPassword = await bcrypt.hash(body.password, 10);

    try {
        const adminAlreadyExits = await prisma.admin.findFirst({
            where: {
                username: body.username
            }
        });

        if (adminAlreadyExits) {
            return c.json({
                msg: "Admin already exits"
            })
        }

        const admin = await prisma.admin.create({
            data: {
                username: body.username,
                password: body.password
            }
        })

        const jwt = await sign({
            id: admin.id
        }, c.env.JWT_SECRET);

        return c.json<SignUpResponseBody>({
            msg: "admin created succefully",
            jwt: jwt
        })
    } catch (error: unknown) {
        // for other types of errors  ,retun a genric error message
        return c.json<ErrorResponse>({
            error: 'An internal error occured'
        }, 500);
    }

});

