
// // 'use client'
// import { redirect, useRouter } from "next/navigation";

// import { createClient } from "@/utils/supabase/server";
// import Navbar from "@/components/Navbar/Navbar";
// import DataTable from "@/components/DataTable/DataTable";
// import UploadButton from "@/components/UploadButton/UploadButton";

// const App = async () => {
//   console.log("i am in root page");
//   const supabase = await createClient();

//   // const router =  useRouter()
//   const { data, error } = await supabase.auth.getUser();
//   console.log("user in app", data)
//   if (error || !data?.user) {
//     // redirect('/login')
//     console.error("error in root");
//     redirect("/login");
//     // router.push("/login")
//   }

//   return (
//     <div className="app">
//       <Navbar />
//       <div className="flex flex-col justify-center items-center gap-10">
//       <UploadButton/>
//       <DataTable />
//       </div>
//     </div>
//   );
// };

// export default App;


// 'use client' is removed as this will be a server-side component.
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar/Navbar";
import DataTable from "@/components/DataTable/DataTable";
import UploadButton from "@/components/UploadButton/UploadButton";
import axios from "axios";

const App = async () => {
  // Initialize Supabase client
  const supabase = await createClient();


  // Fetch authenticated user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  
  if (error || !user) {
    console.error("User authentication failed:", error);
    // Redirect unauthenticated users to the login page
    redirect("/login");
  }

  // Render the authenticated user interface
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
