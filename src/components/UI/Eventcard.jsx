import { Card, Heading, Image } from "@chakra-ui/react";
import { CategoryCard } from "./CategoryCard";

export const EventCard = ({ event }) => {
  const date = event.startTime.split("T")[0];
  const start = event.startTime.split("T")[1].slice(0, 5);
  const end = event.endTime.split("T")[1].slice(0, 5);
  return (
    <Card variant="filled" paddingBottom={4} align="center">
      <Heading padding={4}>{event.title}</Heading>

      <Image src={event.image} alt={event.title} boxSize="xs" />
      <p>{event.description}</p>
      <br />
      <p>📅 {date}</p>
      <p>
        🕑 {start} - {end}
      </p>
      <br />
      <CategoryCard event={event} />
    </Card>
  );
};
