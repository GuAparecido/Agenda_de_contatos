const { prisma } = require("./prisma")

const findByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
};

const register = async (email, password) => {
    return await prisma.user.create({
        data: {
            email: email,
            password: password
        },
    });
};

module.exports = {
    register,
    findByEmail,
};