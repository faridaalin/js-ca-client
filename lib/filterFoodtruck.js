export const filterFoodtruck = (currentFoodtrucks, filteredWords) => {
  let current = [];
  [...currentFoodtrucks].filter((truck) => {
    truck.categories.filter((category) => {
      if (filteredWords) {
        return filteredWords.filter((word) => {
          if (category.name === word) {
            current.push(truck);
            return truck;
          }
        });
      }
    });
  });
  return current;
};
