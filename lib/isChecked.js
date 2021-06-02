import { FAVOURITES } from '../config/constants';

function isChecked(foodtruck) {
  if (typeof window !== 'undefined') {
    const localItem = JSON.parse(localStorage.getItem(FAVOURITES)) || [];
    if (localItem) {
      const element = localItem.find((value) => {
        return value.id === foodtruck.id;
      });
      return typeof element === 'undefined' ? false : true;
    }
  }
}
export default isChecked;
