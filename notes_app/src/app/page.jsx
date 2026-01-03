import NextForm from "@/components/NextForm";
import dbConnect from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  await dbConnect()
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-semibold">Notes App</h1>
      <NextForm />
    </div>
  );
}
