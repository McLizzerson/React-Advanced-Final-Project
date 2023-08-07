import React from "react";
import { Heading } from "@chakra-ui/react";

export const EventPage = () => {
  return (
    <>
      <Heading>Event</Heading>
      <div>
        <ul>
          <li>Name: name of event</li>
          <li>Description: what's it all about</li>
          <li>Nice image </li>
          <li>Time: start - end</li>
          <li>Categories: fun?</li>
          <li>Made by: name and image</li>
        </ul>
        <br />

        <button>Edit event</button>
        <br />
        <button>Delete event</button>
      </div>
    </>
  );
};
