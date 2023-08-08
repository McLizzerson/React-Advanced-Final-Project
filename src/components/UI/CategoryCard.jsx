import { useContext } from "react";
import { EventsContext } from "../../Context";
import { Flex } from "@chakra-ui/react";

export const CategoryCard = ({ event }) => {
  const { categories } = useContext(EventsContext);

  let categoryList = [];
  event.categoryIds.map((id) => {
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
};
