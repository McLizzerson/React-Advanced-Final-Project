import React from "react";
import { Heading } from "@chakra-ui/react";

export const EventsPage = () => {
  return (
    <>
      <Heading>List of events</Heading>

      <div>
        <p>generate event cards using map?</p>
        <ul>
          <li>Even title</li>
          <li>Description</li>
          <li>Image</li>
          <li>Time: start - end</li>
          <li>Categories: fun fun fun</li>
        </ul>
        <br />

        <button>Add event</button>

        <input type="text" placeholder="search here for name" />
        <input type="text" placeholder="search here per category" />
      </div>
    </>
  );
};
