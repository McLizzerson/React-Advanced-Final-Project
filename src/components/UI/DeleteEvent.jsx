import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { redirect } from "react-router-dom";

export const DeleteEvent = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
    });

    console.log(response);
    console.log(response.redirect);
    return redirect(`./events`);
  };

  return (
    <>
      <Button onClick={onOpen}>Delete</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this event?</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
