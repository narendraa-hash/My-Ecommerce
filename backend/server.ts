{ /* import express, { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const NODE_ENV = process.env.NODE_ENV ?? "development";
const PORT = Number(process.env.PORT ?? 5000);

// Basic env validation
if (!EMAIL_USER || !EMAIL_PASS) {
    // Fail fast, but keep it clear
    console.error("Missing EMAIL_USER or EMAIL_PASS in environment variables.");
    process.exit(1);
}

const app = express();

// CORS: restrict origins as needed
app.use(
    cors({
        origin: NODE_ENV === "production" ? ["https://yourdomain.com"] : true,
        methods: ["POST", "GET", "OPTIONS"],
    })
);

// Body parser with limits
app.use(express.json({ limit: "1mb" }));

// Health endpoint
app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
});

// Types for route
type SendEmailBody = {
    toEmail: string;
    subject: string;
    message: string;
};

function validateBody(body: unknown): body is SendEmailBody {
    if (
        typeof body === "object" &&
        body !== null &&
        typeof (body as any).toEmail === "string" &&
        typeof (body as any).subject === "string" &&
        typeof (body as any).message === "string"
    ) {
        return true;
    }
    return false;
}

// Create transporter once (pool)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS, // Prefer App Password for Gmail or use OAuth2
    },
});

// Simple connectivity check at startup (optional but helpful)
transporter.verify((err, success) => {
    if (err) {
        console.error("Email transporter verification failed:", err);
    } else if (success) {
        console.log("Email transporter is ready");
    }
});

app.post(
    "/send-email",
    async (req: Request<unknown, unknown, SendEmailBody>, res: Response, next: NextFunction) => {
        try {
            if (!validateBody(req.body)) {
                return res.status(400).json({ error: "Invalid request body" });
            }

            const { toEmail, subject, message } = req.body;

            // Very basic email format check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(toEmail)) {
                return res.status(400).json({ error: "Invalid toEmail format" });
            }
            if (!subject.trim() || !message.trim()) {
                return res.status(400).json({ error: "subject and message are required" });
            }

            await transporter.sendMail({
                from: EMAIL_USER,
                to: toEmail,
                subject,
                text: message,
            });

            return res.status(200).json({ message: "Email sent successfully" });
        } catch (err) {
            return next(err);
        }
    }
);

// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
});

// Error handler (last)
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

const server = app.listen(PORT, () =>
    console.log(`Server running on port ${PORT} (${NODE_ENV})`)
);

// Graceful shutdown
const shutdown = () => {
    console.log("Shutting down...");
    server.close(() => {
        console.log("HTTP server closed");
        // Close any additional resources here if needed
        process.exit(0);
    });
    // Force exit if not closing in time
    setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
*/ }