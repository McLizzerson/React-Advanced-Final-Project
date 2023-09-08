import React from "react";
import { Heading, Image, Button, Flex } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { UserCard } from "../components/UI/UserCard";
import { CategoryCard } from "../components/UI/CategoryCard";
import { DeleteEvent } from "../components/UI/DeleteEvent";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  return {
    event: await event.json(),
  };
};

export const EventPage = () => {
  const { event } = useLoaderData();

  const date = event.startTime.split("T")[0];
  const start = event.startTime.split("T")[1].slice(0, 5);
  const end = event.endTime.split("T")[1].slice(0, 5);

  return (
    <Flex height="100vh" width="100vw" align="center" justify="center">
      <Flex
        bg="white"
        align="center"
        justify="center"
        direction="column"
        maxW="40vw"
        paddingBottom={4}
        gap={4}
        borderRadius={10}
      >
        <Image
          src={event.image}
          alt={event.title}
          width="100%"
          height="100%"
          borderTopRadius={8}
        />
        <Heading>{event.title}</Heading>
        <p>
          <b>{event.description}</b>
        </p>

        <Flex
          direction="column"
          align="center"
          gap={1}
          flexWrap="wrap"
          padding={4}
        >
          <p>📅 {date}</p>
          <p>
            🕑 {start} - {end}
          </p>
          <p>📌 {event.location}</p>
          <CategoryCard event={event} />
        </Flex>

        <Flex padding={2}>
          <UserCard userId={event.createdBy} />
        </Flex>

        <Flex gap={4}>
          <Button size="sm">Edit</Button>

          <DeleteEvent event={event} />

          <Link to="/">
            <Button size="sm">Home</Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
