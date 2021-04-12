import { CHANGE_INDEX } from '../types/indexConstants';

export default function changeIndex(index) {
  return {
    type: CHANGE_INDEX,
    index
  };
}
