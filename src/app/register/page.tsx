import { redirect } from "next/navigation";
import Link from "next/link";
import { Title, Text, Container } from "@mantine/core";
import classes from "../AuthenticationTitle.module.css";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import RegistrationForm from "./RegistrationForm";

export default function Register() {
  const signUp = async (formData: { email: string; password: string }) => {
    "use server";

    const email = formData.email as string;
    const password = formData.password as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Sign up successful",
    };
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Create Account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do you have an account already?{" "}
        <Link href="/" style={{ textDecoration: "none" }}>
          Sign in
        </Link>
      </Text>
      <RegistrationForm signUp={signUp} />
    </Container>
  );
}
