import { createClient } from "@/utils/supabase/client";

type UserSignInType = {
  email: string;
  password: string;
};

export async function login(formData: UserSignInType) {
  const supabase = await createClient();

  const data = {
    email: formData["email"],
    password: formData["password"],
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Error logging in ", error);
  }

}

export async function signup(formData: UserSignInType) {
  const supabase = await createClient();
  const data = {
    email: formData["email"],
    password: formData["password"],
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error(error);
  }
}

export async function signInWithGoogle() {
  const supabase = await createClient();

  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });
}
