import { Flex, Button, Input, Stack, Select } from "@chakra-ui/react";
import { Form, Link } from "react-router-dom";
import { useContext } from "react";
import { EventsContext } from "../../Context";
import { useActionData } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();
  const newId = await json.id;

  return {
    status: response.status,
    id: newId,
  };
};

export const NewEvent = () => {
  const { users, categories } = useContext(EventsContext);
  const toast = useToast();

  // using the data from the POST request to send a toast
  const info = useActionData();
  if (info !== undefined) {
    const status = info.status;
    switch (status) {
      case 201:
        toast({
          title: "Success!",
          description: `You're event was added succesfully`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        break;
      default:
        toast({
          title: "Woah",
          description: `Something happened! Not sure what "${status}" means though...`,
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
    }
  }

  return (
    <Flex direction="column">
      Fill in the information about your event below.
      <Form method="post" id="new-event-form">
        <Stack spacing={3}>
          <Input
            placeholder="Event title"
            type="text"
            name="title"
            required="required"
          />
          <Input
            placeholder="Description"
            type="text"
            name="description"
            required="required"
          />
          <Input
            placeholder="Image url"
            type="url"
            name="image"
            required="required"
          />
          <Input
            type="datetime-local"
            variant="outline"
            placeholder="Start time"
            name="startTime"
            required="required"
          />
          <Input
            type="datetime-local"
            variant="outline"
            placeholder="End time"
            name="endTime"
            required="required"
          />
          <Input
            placeholder="Location"
            type="text"
            name="location"
            required="required"
          />

          <Select placeholder="Category" name="categoryIds" required="required">
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id} type="number">
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
        <Button type="submit" variant="ghost">
          Submit
        </Button>
      </Form>
      {/* Adding a button to the page when an event has been added succesfully to navigate to the evenlist page */}
      {info !== undefined && (
        <>
          <Link to={`/`}>
            <Button color="green.500">
              Check if your event is in the list!
            </Button>
          </Link>
        </>
      )}
    </Flex>
  );
};
