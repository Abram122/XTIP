import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mail, Timer } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function EmailVerification() {
    const [code, setCode] = useState("")
    const [resendTimer, setResendTimer] = useState(0)
    const { toast } = useToast()
    const navigate = useNavigate()
    const email = sessionStorage.getItem("pendingVerificationEmail")

    useEffect(() => {
        if (!email) {
            navigate(-1)
        }
    }, [email, navigate])

    useEffect(() => {
        if (code.length === 6) {
            handleVerify()
        }
    }, [code])

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
        }
        return () => clearTimeout(timer)
    }, [resendTimer])

    const handleVerify = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/verification/verify`, {
                email,
                code,
            })
            toast({
                title: "Email Verified",
                description: res.data.message || "Your email has been verified successfully.",
            })
            sessionStorage.removeItem("pendingVerificationEmail")
            navigate("/login")
        } catch (err: any) {
            toast({
                title: "Invalid Code",
                description: err.response?.data?.message || "The code is incorrect. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleResend = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/verification/resend`, { email })
            setResendTimer(30)
            toast({
                title: "📩 Code Resent",
                description: "We’ve sent a new verification code to your email.",
            })
        } catch (err: any) {
            toast({
                title: "Failed",
                description: err.response?.data?.message || "Could not resend code",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-background px-4">
            <Card className="w-full max-w-md shadow-xl border border-border bg-card">
                <CardHeader className="text-center space-y-3">
                    <Mail className="w-12 h-12 mx-auto text-primary" />
                    <CardTitle className="text-2xl font-bold text-foreground">
                        Verify Your Email
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <Alert className="bg-muted/40 border-border text-center">
                        <AlertTitle>Check your inbox</AlertTitle>
                        <AlertDescription>
                            We’ve sent a 6-digit verification code to <b>{email}</b>.
                        </AlertDescription>
                    </Alert>

                    <div className="flex justify-center">
                        <InputOTP
                            maxLength={6}
                            value={code}
                            onChange={(val) => setCode(val)}
                        >
                            <InputOTPGroup>
                                {[0, 1, 2, 3, 4, 5].map((i) => (
                                    <InputOTPSlot key={i} index={i} />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    <div className="space-y-3">
                        <Button
                            onClick={handleVerify}
                            disabled={code.length !== 6}
                            className="w-full"
                        >
                            Verify Email
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleResend}
                            disabled={resendTimer > 0}
                            className="w-full flex items-center justify-center gap-2"
                        >
                            <Timer className="w-4 h-4" />
                            {resendTimer > 0
                                ? `Resend in ${resendTimer}s`
                                : "Resend Code"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
