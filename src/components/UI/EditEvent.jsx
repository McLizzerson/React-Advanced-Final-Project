import { Form, redirect } from "react-router-dom";
import { Button, Stack, Input, Select } from "@chakra-ui/react";
import { useContext } from "react";
import { EventsContext } from "../../Context";
import { Flex } from "@chakra-ui/react";

export const action = async ({ request, params }) => {
  console.log(`what are the params?`);
  console.log(params);

  const formData = Object.fromEntries(await request.formData());
  const response = await fetch(`http://localhost:3000/event/${params.id}`, {
    method: "PATCH",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();
  const newId = await json.id;

  return redirect(`/event/${params.id}`);
};

export const EditEvent = ({ event }) => {
  const { users, categories } = useContext(EventsContext);

  return (
    <Flex direction="column">
      Change the information you want below.
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
    </Flex>
  );
};
