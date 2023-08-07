import { Card, Heading, Image } from "@chakra-ui/react";

export const EventCard = ({ event }) => {
  const date = event.startTime.split("T")[0];
  const start = event.startTime.split("T")[1].slice(0, 5);
  const end = event.endTime.split("T")[1].slice(0, 5);
  return (
    <Card variant="filled" padding={1}>
      <Heading>{event.title}</Heading>
      <p>{date}</p>
      <Image src={event.image} alt={event.title} boxSize="xs" />
      <p>"{event.description}"</p>
      <br />

      <p>Start time: {start}</p>
      <p>End time: {end}</p>
      <br />

      <p>Categories: fix category id</p>
    </Card>
  );
};
