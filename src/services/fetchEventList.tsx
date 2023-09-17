import {Events} from '../interfaces/events';

export const fetchEventList = () =>
  fetch("https://gist.githubusercontent.com/ChristianFranke/557381ba18b979acd992a70fc08d31e0/raw/853953c4f0ccd2659cdbf1bbf38628e0b6dff640/bootshaus.json")
  .then(response => {
    return response.json()
  })
  .then((data: Events[]) => {
    return data;
  })
