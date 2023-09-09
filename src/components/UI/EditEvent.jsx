import { Form, useActionData } from "react-router-dom";
import { Button, Stack, Input, Select, Heading, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { EventsContext } from "../../Context";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export const action = async ({ request, params }) => {
  const formData = Object.fromEntries(await request.formData());
  const response = await fetch(
    `http://localhost:3000/events/${params.eventId}`,
    {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.status;
};

export const EditEvent = ({ event }) => {
  const [sentToast, setSentToast] = useState(false);
  const [status, setStatus] = useState(undefined);
  let toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users, categories } = useContext(EventsContext);
  let response;

  // Sending toast
  const sendingToast = () => {
    console.log(`response start of sendingtoast ${response}`);
    response = useActionData();

    // take out the extra toast when editing for a second or third time
    // if response is equal to the previous response it won't send a toast
    // only once the sentToast is back to false again which happens when the submit button is pushed.
    // however you can push and not change and it will still give a succes message without really changing anything.
    if (response != status || sentToast === false) {
      console.log(`response is: ${response}`);

      switch (response) {
        case 200:
          toast({
            title: "Success!",
            description: "Your event was updated succesfully",
            status: "success",
            duration: 1850,
            isClosable: true,
          });
          setSentToast(true);
          setStatus(response);
          break;
        case 404:
          toast({
            title: "Oops",
            description: `The event you tried to update cannot be found ${response} `,
            status: "error",
            duration: 1850,
            isClosable: true,
          });
          setSentToast(true);
          setStatus(response);
          break;
        case undefined:
          break;
        default:
          toast({
            title: "Woah",
            description: `Something happened! Not sure what "${response}" means though...`,
            status: "warning",
            duration: 1850,
            isClosable: true,
          });
          setSentToast(true);
          setStatus(response);
      }
    }
  };

  sendingToast();

  return (
    <>
      <Button
        size="sm"
        onClick={() => {
          onOpen();
        }}
      >
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading align="center">Edit Event</Heading>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text align="center">
              Change the information you want below.
              <br />
              <b>
                📢 Select a category AND a user or else your changes will not be
                made!
              </b>
            </Text>

            <Form method="patch" id="edit-event-form">
              <Stack spacing={3}>
                <Input
                  placeholder="Event title"
                  type="text"
                  name="title"
                  required="required"
                  defaultValue={event.title}
                />
                <Input
                  placeholder="Description"
                  type="text"
                  name="description"
                  required="required"
                  defaultValue={event.description}
                />
                <Input
                  placeholder="Image url"
                  type="url"
                  name="image"
                  required="required"
                  defaultValue={event.image}
                />
                <Input
                  type="datetime-local"
                  variant="outline"
                  placeholder="Start time"
                  name="startTime"
                  required="required"
                  defaultValue={event.startTime}
                />
                <Input
                  type="datetime-local"
                  variant="outline"
                  placeholder="End time"
                  name="endTime"
                  required="required"
                  defaultValue={event.endTime}
                />
                <Input
                  placeholder="Location"
                  type="text"
                  name="location"
                  required="required"
                  defaultValue={event.location}
                />

                <Select
                  placeholder="Category"
                  name="categoryIds"
                  required="required"
                >
                  {categories.map((category) => {
                    return (
                      <option
                        value={category.id}
                        key={category.id}
                        type="number"
                      >
                        {category.name}
                      </option>
                    );
                  })}
                </Select>

                <Select
                  placeholder="Select user"
                  name="createdBy"
                  required="required"
                >
                  {users.map((user) => {
                    return (
                      <option value={user.id} key={user.id} type="number">
                        {user.name}
                      </option>
                    );
                  })}
                </Select>
              </Stack>
              <Button
                type="submit"
                variant="ghost"
                onClick={() => {
                  onClose();
                  setSentToast(false);
                }}
              >
                Submit
              </Button>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
