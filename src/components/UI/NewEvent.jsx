import { Flex, Button, Input, Stack, Select } from "@chakra-ui/react";
import { Form, redirect } from "react-router-dom";
import { useContext } from "react";
import { EventsContext } from "../../Context";

export const action = async ({ request }) => {
  console.log("we're in action, going to try and post!");
  const formData = Object.fromEntries(await request.formData());
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/event/${newId}`);
};

export const NewEvent = () => {
  const { users, categories } = useContext(EventsContext);

  return (
    <Flex direction="column">
      Fill in the information about your event below.
      <Form method="post" id="new-event-form">
        <Stack spacing={3}>
          <Input placeholder="Event title" type="text" name="title" />
          <Input placeholder="Description" type="text" name="description" />
          <Input placeholder="Image url" type="url" name="image" />
          <Input
            type="datetime-local"
            variant="outline"
            placeholder="Start time"
            name="startTime"
          />
          <Input
            type="datetime-local"
            variant="outline"
            placeholder="End time"
            name="endTime"
          />
          <Input placeholder="Location" type="text" name="location" />

          <Select placeholder="Category" name="categoryIds">
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id} type="number">
                  {category.name}
                </option>
              );
            })}
          </Select>

          <Select placeholder="Select user" name="createdBy">
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
    </Flex>
  );
};
