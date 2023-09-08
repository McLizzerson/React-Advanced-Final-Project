import { useContext } from "react";
import { EventsContext } from "../../Context";
import { Flex, Tag } from "@chakra-ui/react";

export const CategoryCard = ({ event }) => {
  const { categories } = useContext(EventsContext);

  // Convert categoryId from added events to a number and push them to an array to keep the data in the same format
  let eventCategoryIdList = [];
  if (typeof event.categoryIds === "string") {
    eventCategoryIdList.push(Number(event.categoryIds));
  } else {
    eventCategoryIdList = event.categoryIds;
  }

  // Retrieve matching category names for the id's so we can display them later
  let categoryList = [];
  eventCategoryIdList.map((id) => {
    categories.map((category) => {
      if (category.id === id) {
        categoryList.push(category.name);
      }
    });
  });

  return (
    <Flex gap={4}>
      {categoryList.map((category) => {
        return (
          <Tag
            key={category}
            size="md"
            variant="outline"
            color="black"
            align="center"
            textAlign="center"
          >
            {category}
          </Tag>
        );
      })}
    </Flex>
  );
};
