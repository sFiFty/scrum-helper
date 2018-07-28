const key = '';
const token = '';

export default {
  getBoardColumns: (boardId) => {
    const url = `https://trello.com/1/boards/${boardId}/lists?fields=all&key=${key}&token=${token}`
    return fetch(url).then((response) => {
      return response.json();
    });
  }
}