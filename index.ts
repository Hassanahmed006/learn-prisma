import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
    await prisma.$connect()

    const data = {
        name: 'Rich',
        email: 'hello@prisma.com',
    };

    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (user) {
        return console.log('enter uniqe email')
    }

    await prisma.user.create({
        data
    })

    console.log('user created');

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })