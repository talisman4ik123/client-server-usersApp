const db = require("../db");
const uuid = require("uuid");

class Controller {
    async registration(req, res) {
        try {
            const { name, email, password } = req.body;

            const candidate = await db.query(
                "SELECT * FROM users WHERE email=$1",
                [email]
            );
            if (candidate.rows[0]) {
                console.log(`user with email ${email} alredy exist`);
                return res.status(400).json({
                    message: `User with email ${email} alredy exist!`,
                });
            }

            const date = formatCurrentDate();

            await db.query(
                "INSERT INTO users (name, email, password, reg_date, log_date, status) values ($1, $2, $3, $4, $5, $6) RETURNING *",
                [name, email, password, date, "", "active"]
            );

            return res
                .status(200)
                .json({ message: "registration was successful" });
        } catch (error) {
            console.error(`server error: ${error}`);
            return res.status(500).json({ message: "Server error!" });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await db.query("SELECT * FROM users WHERE email=$1", [
                email,
            ]);

            if (!user.rows[0]) {
                console.log(`User with email ${email} doesn't exist`);
                return res.status(400).json({
                    message: `User with email ${email} doesn't exist!`,
                });
            }

            if (user.rows[0].password != password) {
                console.log(`Password is not correct`);
                return res.status(400).json({
                    message: `Password is not correct!`,
                });
            }

            if (user.rows[0].status == "block") {
                console.log(`"User with email ${email} is blocked`);
                return res.status(400).json({
                    message: `User with email ${email} is blocked!`,
                });
            }

            const sessia = uuid.v4();
            await db.query(
                "INSERT INTO sessions (sessia, user_id) values ($1, $2)",
                [sessia, user.rows[0].id]
            );

            res.cookie("sessia", sessia, {
                httpOnly: true,
            });

            await db.query("UPDATE users SET log_date=$1 WHERE email=$2", [
                formatCurrentDate(),
                email,
            ]);

            return res.status(200).json({ message: "Login successful!" });
        } catch (error) {
            console.error(`server error: ${error}`);
            return res.status(500).json({ message: "Server error!" });
        }
    }

    async logout(req, res) {
        try {
            const sessia = req.cookies.sessia;
            await db.query("DELETE FROM sessions WHERE sessia=$1", [sessia]);

            res.clearCookie("sessia");

            return res.status(200).json({ message: "Logout successful!" });
        } catch (error) {
            console.error(`server error: ${error}`);
            return res.status(500).json({ message: "Server error!" });
        }
    }

    async getAllUsers(req, res) {
        try {
            const user = await db.query("SELECT * FROM users WHERE id=$1", [
                req.user,
            ]);
            const users = await db.query("SELECT * FROM users order by id");
            return res.json({
                currentUser: {
                    id: user.rows[0].id,
                    name: user.rows[0].name,
                    email: user.rows[0].email,
                },
                users: users.rows,
            });
        } catch (error) {
            console.error(`server error: ${error}`);
            return res.status(500).json({ message: "Server error!" });
        }
    }

    async blockSelectedUsers(req, res) {
        try {
            const { ids } = req.body; // ожидается массив id

            if (!Array.isArray(ids) || ids.length === 0) {
                return res
                    .status(400)
                    .json({ message: "Invalid or empty ids array" });
            }

            // Обновляем статус пользователей с указанными id
            await db.query(
                "UPDATE users SET status = 'block' WHERE id = ANY($1)",
                [ids]
            );

            // Получаем обновленных пользователей
            const users = await db.query("SELECT * FROM users order by id");

            return res.json(users.rows);
        } catch (error) {
            console.error(`server error: ${error}`);
            return res.status(500).json({ message: "Server error!" });
        }
    }
}

function formatCurrentDate() {
    const now = new Date();

    // Получение компонентов даты и времени
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Месяцы с 0
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    // Форматирование строки
    const datePart = `${day}:${month}:${year}`;
    const timePart = `${hours}:${minutes}`;

    return `${datePart} ${timePart}`;
}

module.exports = new Controller();
