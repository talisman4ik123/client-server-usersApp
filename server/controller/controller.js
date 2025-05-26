const db = require("../db");

class Contrroler {
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

module.exports = new Contrroler();
