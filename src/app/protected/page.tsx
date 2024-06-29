import AuthButton from "@/app/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { TableSort } from "./Table";
import AddNoteModal from "../components/AddNoteModal";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-green-500 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <div className="font-bold ">TO-DO LIST</div>
            <AuthButton />
          </div>
        </nav>
      </div>
      <AddNoteModal />

      <div className="mx-20">
        <TableSort />
      </div>
    </div>
  );
}
