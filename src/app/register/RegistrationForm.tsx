"use client";
import {
  Anchor,
  Button,
  Center,
  Group,
  Loader,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import Link from "next/link";

type LoginFormProps = (formData: {
  email: string;
  password: string;
}) => Promise<{ success: boolean; message: string }>;

export default function RegistrationForm({
  signUp,
}: {
  signUp: LoginFormProps;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState({
    success: false,
    message: "",
  });
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value === undefined
          ? "Password is required"
          : value.length < 8
          ? "Password must be at least 8 characters long"
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  if(isLoading) return <><Loader color="blue" size="xl" type="dots" /></>;

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      {result.success ? (
        <>
          <Center>
            <Link style={{ textDecoration: 'none', color: 'green'}} href="/">{result.message}</Link>
          </Center>
        </>
      ) : (
        <>
          <form
            onSubmit={form.onSubmit((values) => {
              setIsLoading(true);
              signUp({ email: values.email, password: values.confirmPassword })
                .then((result) => {
                  if (result.success) {
                    setResult(result);
                  }
                })
                .catch((e) => {
                  prompt(e.message);
                });
              setIsLoading(false);
            })}
          >
            <TextInput
              mt="sm"
              label="Email"
              placeholder="jason@gmail.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Repeat password"
              required
              mt="md"
              {...form.getInputProps("confirmPassword")}
            />
            <Button type="submit" mt="sm">
              Submit
            </Button>
          </form>
        </>
      )}
    </Paper>
  );
}
