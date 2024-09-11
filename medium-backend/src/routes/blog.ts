import { Context, Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { verify } from 'hono/jwt'
// import bcrypt from 'bcrypt'

// type Variables = {
//     userId: string
// }

export const blogRouter = new Hono<{
    // it is good to have bindings while initializing bindings
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();




blogRouter.use('/*', async (c, next) => {

    console.log("hello");
    // authentication checks whenever the requests comes to any of the routes
    // this middleware will extract the user id 
    // pass the user id over to the blogRouters
    //we can use set() and get() to pass the values from middlewares to endpoints.

    //authHeader is the authorization token sent with the request on the postman 
    const authHeader = c.req.header("authorization") || "";

    try {

        const user = await verify(authHeader, c.env.JWT_SECRET);
        // console.log(user.id);

        // If the token is valid and has not expired, verify will return the decoded payload of the token.

        // for example : -

        // {
        //     "userId": "12345",
        //     "roles": ["admin", "user"],
        //     "exp": 1625256000
        //   }


        if (user) {

            if (typeof user.id === "string") {
                c.set("userId", user.id);
                // console.log("user id set");
                await next();
            }
            else {
                return c.json({
                    msg: "not a valid user authentication failed"
                })
            }
        }
        else {
            c.status(403);
            return c.json({
                msg: "you are not authenticated"
            })
        }
    } catch (error) {
        // handle any potential error form verify
        console.log("error here")
        c.status(500);
        return c.json({
            msg: "error while authentication",
            error: error
        })
    }

});


//add pagination =>  add only first 10 blogs on the page but user can req for more if they scroll down.
blogRouter.get('/blogs', async (c) => {
    // to get all the blogs
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    })


});


blogRouter.post('/addblog', async (c) => {
    // to post a blog
    const body = await c.req.json();

    const authorId = c.get("userId"); // userId will be a string 
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId // in case if authorId accepts Int we need to comvert authorId to int : Number(authorId)
        }
    })

    return c.json({
        msg: "blog posted successfully"
    })
});

blogRouter.get('/:id', async (c) => {
    // to get a single blog through id 
    // never use body in get request (body makes no sense in get request's)
    // user parameters and queries to get values from url in a get request
    // const body = await c.req.json();  this is wrong instead 
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        console.log("this is blog" + blog);
        if (blog) {
            return c.json({
                id: blog.id,
                title: blog.title,
                content:blog.content,
                author: blog.author.name

            })
         

        }
        else{
            return c.json({
                msg: "no such blog exits"
            })
        }

    } catch (error) {
        return c.json({
            msg: "error while fetching data",
            error: error
        })
    }
});



blogRouter.put('/', async (c) => {
    // to update a blog

    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    await prisma.post.update({

        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    });
    return c.json({
        msg: "blog updated successfully"
    })
});





blogRouter.get('/id', async (c) => {

    console.log("blog router")
    // to get a single blog through id 
    // never use body in get request (body makes no sense in get request's)
    // user parameters and queries to get values from url in a get request
    // const body = await c.req.json();  this is wrong instead 
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        console.log("hello")
        return c.json("helloooooo")

    } catch (error) {
        return c.json({
            msg: "error",
            error: error
        })

    }
});