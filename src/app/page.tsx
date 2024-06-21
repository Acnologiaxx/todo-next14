
import Link from "next/link";
import {
  Title,
  Text,
  Container,
} from "@mantine/core";
import classes from "./AuthenticationTitle.module.css";
import { createClient } from "@/utils/supabase/server";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";

export default function Home() {
  const signIn = async (formData: { email: string; password: string }) => {
    "use server";

    const email = formData.email as string;
    const password = formData.password as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(error);

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
    <>
      <Header />
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Link href="/register" style={{ textDecoration: "none" }}>
            Create account
          </Link>
        </Text>
        <LoginForm signIn={signIn} />
      </Container>
    </>
  );
}
