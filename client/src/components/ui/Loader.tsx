import { motion } from "framer-motion"

export default function Loader({ fullscreen = true }: { fullscreen?: boolean }) {
    return (
        <div
            className={`flex items-center justify-center ${fullscreen ? "min-h-screen" : "py-10"
                } bg-background`}
        >
            <motion.div
                className="relative flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <motion.span
                    className="absolute w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                <motion.span
                    className="absolute w-10 h-10 border-4 border-muted border-b-transparent rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
                <span className="text-primary font-semibold text-lg">Loading...</span>
            </motion.div>
        </div>
    )
}
