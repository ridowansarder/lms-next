"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Github, Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");
  const signInWithGithub = async () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in successfully with Github. Redirecting...");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      });
    });
  };
  const signInWithEmail = async () => {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email sent. Please check your inbox.");
            router.push(`/verify-email?email=${email}`);
          },
          onError: () => {
            toast.error("Error sending email.");
          },
        },
      });
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
        <Button
          disabled={githubPending}
          onClick={signInWithGithub}
          variant="outline"
          className="w-full"
        >
          {githubPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <Github className="size-4" />
              <span>Sign in with Github</span>
            </>
          )}
        </Button>

        <FieldSeparator>Or continue with</FieldSeparator>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            type="email"
            placeholder="ridu@example.com"
          />
        </div>

        <Button
          disabled={emailPending}
          onClick={signInWithEmail}
          className="w-full"
        >
          {emailPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <Send className="size-4" />
              <span>Sign in with email</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
