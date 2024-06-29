"use client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import useEditModalStore from "@/store/useEditModalStore";

export default function EditNoteModal({ id, title }: Readonly<{ id: string; title: string }>) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  
  const { isOpen: opened, close, open } = useEditModalStore();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);


  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      notes: title,
    },
  });

  const handleSubmit = async (values: { notes: string; }) => {
    if (user) {
      const { data, error } = await supabase
        .from("notes")
        .update({ title: values.notes })
        .eq("users_id", user.id);
      if (error) {
        console.error("Error inserting note: ", error);
      } else {
        console.log("Note inserted: ", data);
        close(); 
      }
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Textarea
            label="Edit notes"
            placeholder="Today, I woke up at 6:00 AM and had a great day"
            {...form.getInputProps("notes")}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Update</Button>
          </Group>
        </form>
      </Modal>

      <Button variant="transparent" onClick={open}>Edit Notes</Button>
    </>
  );
}
