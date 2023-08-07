import React from "react";
import { useLoaderData } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";
import { EventCard } from "../components/UI/Eventcard";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  return {
    events: await events.json(),
  };
};

export const EventsPage = () => {
  const { events } = useLoaderData();
  console.log(events);

  return (
    <>
      <Heading>List of events</Heading>
      <Flex gap={5}>
        {events.map((event) => {
          return <EventCard event={event} key={event.id} />;
        })}
      </Flex>
      <br />
      <button>Add event</button>
      <input type="text" placeholder="search here for name" />
      <input type="text" placeholder="search here per category" />
    </>
  );
};
