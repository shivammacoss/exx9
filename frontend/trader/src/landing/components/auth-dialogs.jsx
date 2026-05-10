'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/landing/components/ui/button"
import { Input } from "@/landing/components/ui/input"
import { Label } from "@/landing/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/landing/components/ui/dialog"
import { Eye, EyeOff, Mail, Lock, User, Phone, Briefcase, Globe, MessageSquare, HeadphonesIcon } from "lucide-react"
import { useAuthStore } from "@/stores/authStore"
import api from "@/lib/api/client"

function extractApiError(err, fallback) {
  if (!err) return fallback
  if (err instanceof Error && err.message) return err.message
  if (typeof err === "string") return err
  return fallback
}


export function LoginDialog({ trigger }) {
  const router = useRouter()
  const login = useAuthStore((s) => s.login)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      await login(formData.email, formData.password)
      setOpen(false)
      router.push("/accounts")
    } catch (err) {
      setError(extractApiError(err, "Sign in failed. Please try again."))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setError("") }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-emerald-200/60 shadow-[0_24px_60px_-15px_rgba(16,185,129,0.35)]">
        {/* Brand header with gradient + logo */}
        <div className="relative bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-7 pb-5 border-b border-emerald-100/80 overflow-hidden">
          <div className="pointer-events-none absolute -top-12 -right-10 w-44 h-44 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-10 w-44 h-44 rounded-full bg-lime-400/15 blur-3xl" />
          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white border border-emerald-200 shadow-sm shadow-emerald-500/20">
              <img src="/images/exx9_logo_dark.png" alt="" className="w-7 h-7 object-contain" />
            </div>
            <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 via-emerald-500 to-lime-500 bg-clip-text text-transparent">exx9</span>
          </div>
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</DialogTitle>
            <DialogDescription className="text-slate-500 text-sm pt-1">
              Sign in to access your trading account
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-5 space-y-5 bg-white">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 flex items-start gap-2">
              <span className="mt-0.5">⚠</span>
              <span>{error}</span>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-sm font-semibold text-slate-700">
              Email Address
            </Label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                className="pl-11 h-12 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all dark:bg-white dark:text-slate-900"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password" className="text-sm font-semibold text-slate-700">
                Password
              </Label>
              <button
                type="button"
                className="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-2"
                onClick={() => {
                  setOpen(false)
                  router.push("/auth/forgot-password")
                }}
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-11 pr-11 h-12 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all dark:bg-white dark:text-slate-900"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-lime-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In →"}
          </Button>

          <p className="text-center text-sm text-slate-500 pt-1">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-2 bg-transparent p-0 border-0 cursor-pointer"
              onClick={() => {
                setOpen(false)
                router.push("/auth/register")
              }}
            >
              Open Account
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}


export function OpenAccountDialog({ trigger }) {
  const router = useRouter()
  const register = useAuthStore((s) => s.register)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    const trimmedName = formData.fullName.trim()
    if (!trimmedName) {
      setError("Please enter your full name.")
      return
    }
    const [first, ...rest] = trimmedName.split(/\s+/)
    const last = rest.join(" ") || first
    setIsLoading(true)
    try {
      await register({
        email: formData.email,
        password: formData.password,
        first_name: first,
        last_name: last,
        phone: formData.phone || undefined,
      })
      setOpen(false)
      router.push("/accounts")
    } catch (err) {
      setError(extractApiError(err, "Registration failed. Please try again."))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setError("") }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <div className="relative bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-7 pb-5 border-b border-emerald-100/80 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">Create Account</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Start your trading journey with VXNESS
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="register-name" className="text-sm font-semibold text-slate-700">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="register-name"
                type="text"
                placeholder="Enter your full name"
                className="pl-10 h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email" className="text-sm font-semibold text-slate-700">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                className="pl-10 h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-phone" className="text-sm font-semibold text-slate-700">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="register-phone"
                type="tel"
                placeholder="Enter your phone number"
                className="pl-10 h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password" className="text-sm font-semibold text-slate-700">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                className="pl-10 pr-10 h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                minLength={8}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-confirm-password" className="text-sm font-semibold text-slate-700">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="register-confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="pl-10 h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-lime-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-2 bg-transparent p-0 border-0 cursor-pointer"
              onClick={() => {
                setOpen(false)
                router.push("/auth/login")
              }}
            >
              Sign In
            </button>
          </p>

          <p className="text-xs text-muted-foreground text-center">
            By creating an account, you agree to our{" "}
            <span className="text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-2 cursor-pointer font-medium">Terms of Service</span>
            {" "}and{" "}
            <span className="text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-2 cursor-pointer font-medium">Privacy Policy</span>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}


export function TalkToTeamDialog({ trigger }) {
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      await api.post("/public/leads", {
        kind: "contact",
        full_name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        message: formData.message || undefined,
        source: "talk-to-team",
      })
      setSubmitted(true)
    } catch (err) {
      setError(extractApiError(err, "Could not send your message. Please try again."))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog onOpenChange={(open) => { if (!open) { setSubmitted(false); setError("") } }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-7 pb-5 border-b border-emerald-100/80 overflow-hidden">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-11 h-11 bg-gradient-to-br from-emerald-100 to-lime-100 rounded-xl flex items-center justify-center shadow-sm shadow-emerald-500/20 border border-emerald-200">
                <HeadphonesIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <DialogTitle className="text-2xl font-bold text-foreground">Talk to Our Team</DialogTitle>
            </div>
            <DialogDescription className="text-muted-foreground">
              Our partnership team will get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
        </div>

        {submitted ? (
          <div className="p-8 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
            <p className="text-slate-500 text-sm max-w-xs">
              Thank you for reaching out. A member of our partnership team will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="talk-firstname" className="text-sm font-semibold text-slate-700">First Name</Label>
                <Input
                  id="talk-firstname"
                  type="text"
                  placeholder="First name"
                  className="h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="talk-lastname" className="text-sm font-semibold text-slate-700">Last Name</Label>
                <Input
                  id="talk-lastname"
                  type="text"
                  placeholder="Last name"
                  className="h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="talk-email" className="text-sm font-semibold text-slate-700">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="talk-email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="talk-phone" className="text-sm font-semibold text-slate-700">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="talk-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="pl-10 h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="talk-company" className="text-sm font-semibold text-slate-700">Company <span className="text-slate-400 font-normal">(optional)</span></Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="talk-company"
                  type="text"
                  placeholder="Your company name"
                  className="pl-10 h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="talk-message" className="text-sm font-semibold text-slate-700">Message <span className="text-slate-400 font-normal">(optional)</span></Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <textarea
                  id="talk-message"
                  rows={3}
                  placeholder="How can we help you?"
                  className="w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none transition-colors"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-lime-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}


const partnerTypes = [
  { value: "introducing-broker", label: "Introducing Broker (IB)" },
  { value: "trading-community", label: "Trading Community" },
  { value: "content-creator", label: "Content Creator / Influencer" },
  { value: "white-label", label: "White Label" },
  { value: "other", label: "Other" },
]

export function BecomePartnerDialog({ trigger }) {
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    partnerType: "",
    message: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      await api.post("/public/leads", {
        kind: "partner",
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        website: formData.website || undefined,
        partner_type: formData.partnerType || undefined,
        message: formData.message || undefined,
        source: "become-partner",
      })
      setSubmitted(true)
    } catch (err) {
      setError(extractApiError(err, "Could not submit your application. Please try again."))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog onOpenChange={(open) => { if (!open) { setSubmitted(false); setError("") } }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-7 pb-5 border-b border-emerald-100/80 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">Become a Partner</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Join the VXNESS Partner Programme and grow your business with us.
            </DialogDescription>
          </DialogHeader>
        </div>

        {submitted ? (
          <div className="p-8 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Application Received!</h3>
            <p className="text-slate-500 text-sm max-w-xs">
              Thank you for your interest in partnering with VXNESS. Our partnership team will review your application and reach out within 1–2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="partner-name" className="text-sm font-semibold text-slate-700">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="partner-name"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-10 h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="partner-email" className="text-sm font-semibold text-slate-700">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="partner-email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="partner-phone" className="text-sm font-semibold text-slate-700">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="partner-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="pl-10 h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="partner-company" className="text-sm font-semibold text-slate-700">Company / Organisation <span className="text-slate-400 font-normal">(optional)</span></Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="partner-company"
                  type="text"
                  placeholder="Your company name"
                  className="pl-10 h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="partner-website" className="text-sm font-semibold text-slate-700">Website / Social Profile <span className="text-slate-400 font-normal">(optional)</span></Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="partner-website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  className="pl-10 h-11 bg-white text-slate-900 placeholder:text-slate-400 dark:bg-white dark:text-slate-900"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
            </div>

            {/* Partner Type */}
            <div className="space-y-2">
              <Label htmlFor="partner-type" className="text-sm font-semibold text-slate-700">Partnership Type</Label>
              <select
                id="partner-type"
                className="w-full h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                value={formData.partnerType}
                onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                required
              >
                <option value="" disabled>Select a partnership type</option>
                {partnerTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="partner-message" className="text-sm font-semibold text-slate-700">Message <span className="text-slate-400 font-normal">(optional)</span></Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <textarea
                  id="partner-message"
                  rows={3}
                  placeholder="Tell us about your audience, experience or goals..."
                  className="w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none transition-colors"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-lime-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By submitting, you agree to our{" "}
              <span className="text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-2 cursor-pointer font-medium">Terms of Service</span>
              {" "}and{" "}
              <span className="text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-2 cursor-pointer font-medium">Privacy Policy</span>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
