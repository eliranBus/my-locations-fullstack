import { CHANGE_TITLE } from '../types/titleConstants';

export default function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    title
  };
}
