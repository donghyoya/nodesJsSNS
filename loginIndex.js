import express from "express";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port = 3000;

// Redis 설정
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({ host: '127.0.0.1', port: 6379 });

// 세션 미들웨어 설정
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: "your-strong-secret-key",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // 이 부분은 HTTPS를 사용할 경우에 true로 설정하세요.
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 정적 파일 제공
app.use(express.static("public"));

// 로그인 페이지 제공
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// 로그인 라우트
app.post("/process/login", (req, res) => {
    const { username, password } = req.body;

    // 간단한 로그인 체크 (실제로는 데이터베이스와 비교해야 함)
    if (username === "user" && password === "password") {
        // 로그인 성공
        req.session.user = { username };
        res.send("Login successful!");
    } else {
        // 로그인 실패
        res.status(401).send("Invalid credentials");
    }
});

// 로그아웃 라우트
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Logout successful!");
        }
    });
});

// 보호된 라우트
app.get("/protected", (req, res) => {
    if (req.session.user) {
        res.send(`Welcome, ${req.session.user.username}!`);
    } else {
        res.status(401).send("Unauthorized");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});