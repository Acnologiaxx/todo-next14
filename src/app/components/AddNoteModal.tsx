"use client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import useModalStore from "@/store/useModalStore";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function AddNoteModal() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  
  const { isOpen: opened, close, open } = useModalStore();

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
      notes: "",
    },
  });

  const handleSubmit = async (values: { notes: string; }) => {
    if (user) {
      const { data, error } = await supabase
        .from("notes")
        .insert([{ title: values.notes, users_id: user.id }]);
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
            label="Add notes"
            placeholder="Today, I woke up at 6:00 AM and had a great day"
            {...form.getInputProps("notes")}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Add</Button>
          </Group>
        </form>
      </Modal>

      <Button onClick={open}>Add Notes</Button>
    </>
  );
}
