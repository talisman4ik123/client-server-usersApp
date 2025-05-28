const db = require("../db");

module.exports = async function authMiddleware(req, res, next) {
    try {
        // Проверяем наличие cookie 'sessia'
        const sessia = req.cookies.sessia;

        if (!sessia) {
            console.log("cookie not found");
            return res.status(401).json({ message: "Authorization error." });
        }

        // (Опционально) Проверка сессии в базе данных
        const sessiaDb = await db.query(
            "SELECT * FROM sessions WHERE sessia=$1",
            [sessia]
        );

        if (!sessiaDb.rows[0]) {
            return res.status(401).json({
                message: "Authorization error. Session is inactive or invalid!",
            });
        }

        const user = await db.query("SELECT * FROM users WHERE id=$1", [
            sessiaDb.rows[0].user_id,
        ]);

        if (user.rows[0].status !== "active") {
            console.log(
                `${user.rows[0].email} has status ${user.rows[0].status}`
            );
            return res
                .status(401)
                .json({ message: "Authorization error. User is not active!" });
        }

        // Если всё хорошо, передаём управление дальше
        req.user = sessiaDb.rows[0].user_id;
        next();
    } catch (err) {
        console.error("authMiddleware error:", err);
        res.status(500).json({ message: "Server error!" });
    }
};
