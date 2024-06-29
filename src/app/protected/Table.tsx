"use client";
import { useEffect, useRef, useState } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Button,
  Textarea,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import classes from "./TableSort.module.css";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import useModalStore from "@/store/useModalStore";
import { useForm } from "@mantine/form";
import useEditModalStore from "@/store/useEditModalStore";

interface RowData {
  id: string;
  title: string;
  users_id: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

const data = [
  {
    name: "Athena Weissnat",
    company: "Little - Rippin",
    email: "Elouise.Prohaska@yahoo.com",
  },
  {
    name: "Deangelo Runolfsson",
    company: "Greenfelder - Krajcik",
    email: "Kadin_Trantow87@yahoo.com",
  },
  {
    name: "Danny Carter",
    company: "Kohler and Sons",
    email: "Marina3@hotmail.com",
  },
  {
    name: "Trace Tremblay PhD",
    company: "Crona, Aufderhar and Senger",
    email: "Antonina.Pouros@yahoo.com",
  },
  {
    name: "Derek Dibbert",
    company: "Gottlieb LLC",
    email: "Abagail29@hotmail.com",
  },
  {
    name: "Viola Bernhard",
    company: "Funk, Rohan and Kreiger",
    email: "Jamie23@hotmail.com",
  },
  {
    name: "Austin Jacobi",
    company: "Botsford - Corwin",
    email: "Genesis42@yahoo.com",
  },
  {
    name: "Hershel Mosciski",
    company: "Okuneva, Farrell and Kilback",
    email: "Idella.Stehr28@yahoo.com",
  },
  {
    name: "Mylene Ebert",
    company: "Kirlin and Sons",
    email: "Hildegard17@hotmail.com",
  },
  {
    name: "Lou Trantow",
    company: "Parisian - Lemke",
    email: "Hillard.Barrows1@hotmail.com",
  },
  {
    name: "Dariana Weimann",
    company: "Schowalter - Donnelly",
    email: "Colleen80@gmail.com",
  },
  {
    name: "Dr. Christy Herman",
    company: "VonRueden - Labadie",
    email: "Lilyan98@gmail.com",
  },
  {
    name: "Katelin Schuster",
    company: "Jacobson - Smitham",
    email: "Erich_Brekke76@gmail.com",
  },
  {
    name: "Melyna Macejkovic",
    company: "Schuster LLC",
    email: "Kylee4@yahoo.com",
  },
  {
    name: "Pinkie Rice",
    company: "Wolf, Trantow and Zulauf",
    email: "Fiona.Kutch@hotmail.com",
  },
  {
    name: "Brain Kreiger",
    company: "Lueilwitz Group",
    email: "Rico98@hotmail.com",
  },
];

type NotesProps = {
  id: string;
  title: string;
  users_id: string;
};

export function TableSort() {
  const supabase = createClient();
  const { isOpen: opened } = useModalStore();
  const { isOpen: update, open, close } = useEditModalStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      notes: "",
    },
  });

  const handleRowClick = (id: string, title: string) => {
    setEditingId(id);
    setEditValue(title);
  };
  
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<any>([]);
  const [sortedData, setSortedData] = useState(notes);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      const { data: notes } = await supabase
        .from("notes")
        .select()
        .eq("users_id", user?.id);
      setSortedData(notes);
      setNotes(notes);
    };
    fetchUser();
  }, [opened, update]);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(notes, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(notes, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const handleSubmit = async (values: { notes: string }, id: string) => {
    if (user) {
      open()
      const { data, error } = await supabase
        .from("notes")
        .update({ title: values.notes })
        .eq("id", id);
      if (error) {
        console.error("Error updating note: ", error);
      } else {
        console.log("Note updated: ", data);
        close()
      }
    }
  };

  // const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       inputRef.current &&
  //       !inputRef.current.contains(event.target as Node)
  //     ) {
  //       setEditingId(null);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const rows = sortedData?.map((row: any) => (
    <Table.Tr
      key={row.id}
      onClick={() => handleRowClick(row.id, row.title)}
      style={{
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      <Table.Td>
      {editingId === row.id ? (
        <form onSubmit={form.onSubmit((values)=> handleSubmit(values, row.id))}>
          <Textarea
            label="Edit notes"
            placeholder={editValue}
            {...form.getInputProps("notes")}
          />
          <Button type="submit">Submit</Button>
        </form>
      ) : (
        row.title
      )}
    </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === "title"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("title")}
            >
              title
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
