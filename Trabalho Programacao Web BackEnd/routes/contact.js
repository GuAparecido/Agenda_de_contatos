const express = require("express");
const router = express.Router();
const { z, ZodError } = require("zod");
const { findContacts, savedContact, deleteContact, updateContact } = require("../db/contacts");
const { auth } = require("../middlewares/auth");

const ContactSchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
})

router.get("/contacts", auth, async (req, res) => {
    const contatos = await findContacts(req.user);
    res.json({ contatos });
});

router.post("/contact", auth, async (req, res) => {
    try {
        const { name, phone, email } = ContactSchema.parse(req.body);
        const contato = await savedContact(name, phone, email, req.user);
        res.json({ contato });
    } catch (error) {
        if (error instanceof z.ZodError) res.status(400).json(error);
        res.status(401).send();
        console.log(error);
    }
});

router.put("/contact/:id", auth, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = ContactSchema.parse(req.body);
        const contato = await updateContact(id, data, req.user.id);
        res.json(contato);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json(error.errors.map((err) => err.message));
        }
        res.status(500).send();
    }
});

router.delete("/contact/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    await deleteContact(id, req.user.id);
    res.status(204).send();
});

module.exports = {
    router
};
