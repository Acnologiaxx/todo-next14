"use client";
import {
  Anchor,
  Button,
  Group,
  Loader,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

type LoginFormProps = (formData: {
  email: string;
  password: string;
}) => Promise<{ success: boolean; message: string }>;

export default function LoginForm({ signIn }: { signIn: LoginFormProps }) {
    const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState({
    success: false,
    message: "",
  })
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  if(isLoading) return <><Loader color="blue" size="xl" type="dots" /></>;

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form
        onSubmit={form.onSubmit((values) => {
          setIsLoading(true);
          signIn(values).then((result)=> {
            if(result.success){
                setIsLoading(false)
                router.push('/protected')
            }
          }).catch((e)=> {
            setResult({ success: false, message: e.message})
          });
          setIsLoading(false)
        })}
      >
        <TextInput
          mt="sm"
          label="Email"
          placeholder="Email"
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
        <Button type="submit" mt="sm">
          Submit
        </Button>
      </form>
      <Group justify="space-between" mt="lg">
        <Anchor component="button" size="sm">
          Forgot password?
        </Anchor>
      </Group>
      {result.message}
    </Paper>
  );
}
