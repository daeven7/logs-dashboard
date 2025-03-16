import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { DataTable } from "@/components/DataTable";
import { Navbar } from "@/components/Navbar";
import { UploadButton } from "@/components/UploadButton";

const App = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error("User authentication failed:", error);
    redirect("/login");
  }

  return (
    <div className="app">
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-10">
        <UploadButton />
        <DataTable />
      </div>
    </div>
  );
};

export default App;
