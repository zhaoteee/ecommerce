import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <UserButton />
      <Button>2222</Button>
      <div className="">hello world!</div>
      <div className="font-barlow">hello world!</div>
    </>
  );
}
