import { Card, Heading, Image } from "@chakra-ui/react";

export const EventCard = ({ event }) => {
  return (
    <Card>
      <Heading>{event.title}</Heading>
      <p>"{event.description}"</p>
      <Image src={event.image} alt={event.title} boxSize="xs" />
      <p>Start time: {event.startTime}</p>
      <p>End time: {event.endTime}</p>
      <p>Categories: fix category id</p>
    </Card>
  );
};
