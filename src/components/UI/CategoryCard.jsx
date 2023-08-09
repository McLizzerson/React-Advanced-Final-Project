import { useContext } from "react";
import { EventsContext } from "../../Context";
import { Flex } from "@chakra-ui/react";

export const CategoryCard = ({ event }) => {
  const { categories } = useContext(EventsContext);

  // Convert the categoryId from added events to a  number and push them to an array to keep the data in the same format
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

  if (categoryList.length > 1) {
    return (
      <Flex>
        <p>Categories: {categoryList.join(" - ")}</p>
      </Flex>
    );
  } else {
    return (
      <Flex>
        <p>Category: {categoryList}</p>
      </Flex>
    );
  }
  // }
};
