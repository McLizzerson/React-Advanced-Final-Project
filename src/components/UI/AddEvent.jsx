import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Stack,
  Select,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";

export const AddEvent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Add event</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Fill in the information about your event below.
            <Form>
              <Stack spacing={3}>
                <Input variant="outline" placeholder="Event title" />
                <Input variant="outline" placeholder="Description" />
                <Input type="url" variant="outline" placeholder="Image url" />
                <Input type="date" variant="outline" placeholder="Date" />
                <Input type="time" variant="outline" placeholder="Start time" />
                <Input type="time" variant="outline" placeholder="End time" />
                <Input variant="outline" placeholder="Location" />
                <Select placeholder="Select user">
                  <option value="1">User 1</option>
                  <option value="2">User 2</option>
                </Select>
              </Stack>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
