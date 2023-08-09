import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventLoader } from "./pages/EventPage";
import { EventsPage, loader as eventsLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, loader as contextLoader } from "./components/Root";
// import { AddEvent } from "./components/UI/AddEvent";
import { NewEvent, action as newEvent } from "./components/UI/NewEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: contextLoader,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventLoader,
        // action: addComment,
      },
      {
        path: "/new",
        element: <NewEvent />,
        action: newEvent,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
