const { prisma } = require("./prisma");

const findContacts = async (userId) => {
    return await prisma.contatos.findMany({
        where: {
            userId,
        },
    });
};

const findById = async (id, userId) => {
    const contato = await prisma.contatos.findFirst({
        where: {
            id,
            usersId: userId,
        },
    });
    return contato;
};

const savedContact = async (name, phone, email, userId) => {
    return await prisma.contatos.create({
        data: {
            name: name,
            phone: phone,
            email: email,
            user: {
                connect: {
                    id: userId
                },
            },
        },
    });
};

const updateContact = async (id, data, userId) => {
    await prisma.contatos.update({
        data,
        where: {
            id: id,
            usersId: userId,
        },
    });
    return await findById(id, userId);
};

const deleteContact = async (id, userId) => {
    await prisma.contatos.delete({
        where: {
            id: id,
            usersId: userId,
        },
    });
};

module.exports = {
    findContacts,
    savedContact,
    updateContact,
    deleteContact
}