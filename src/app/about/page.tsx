'use client'
import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import image from './image.svg';
import classes from './HeroBullets.module.css';
import { useRouter } from 'next/navigation';

export default function HeroBullets() {
    const router = useRouter()
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            A <span className={classes.highlight}>modern</span> React <br /> components library with Supabase
          </Title>
          <Text c="dimmed" mt="md">
            Build fully functional accessible web applications faster than ever – Mantine includes
            more than 120 customizable components and hooks to cover you in any situation.
          </Text>

          <Text c="dimmed" mt="md">
            Supabase -
            Build production-grade applications with a Postgres database, Authentication, instant APIs, Realtime, Functions, Storage and Vector embeddings.
          </Text>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control} onClick={() => router.push('/')}>
              Get started
            </Button>
            <Button variant="default" radius="xl" size="md" className={classes.control} onClick={() => router.push('https://github.com/Acnologiaxx/next-todo')}>
              Source code
            </Button>
          </Group>
        </div>
        <Image alt='hero-about' src={image.src} className={classes.image} />
      </div>
    </Container>
  );
}