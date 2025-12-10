"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggler";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const signOut = async () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed out successfully.");
        },
      },
    });
  };
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
      <ModeToggle />
      {session ? (
        <>
          <p>Hi {session.user?.name}!</p>
          <Button onClick={signOut} variant={"outline"}>
            Sign out
          </Button>
        </>
      ) : (
        <p>
          Please{" "}
          <Link
            href="/login"
            className={buttonVariants({
              variant: "outline",
              className: "ml-2",
            })}
          >
            sign in
          </Link>
        </p>
      )}
    </div>
  );
}
