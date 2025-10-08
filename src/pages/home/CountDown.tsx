import { useEffect, useState } from "react";

function CountDown ({targetDate}: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const end = new Date(targetDate).getTime();
            const diff = end - now;

            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft("Expired");
                return;
            }

            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return <span>{timeLeft}</span>
}

export default CountDown;
