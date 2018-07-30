const key = '';
const token = '';

export default {
  getBoardColumns: (boardId) => {
    const url = `https://trello.com/1/boards/${boardId}/lists?fields=all&key=${key}&token=${token}`;
    return fetch(url).then(r => r.json());
  },
  getBoardLabels: (boardId) => {
    const url = `https://api.trello.com/1/boards/${boardId}/labels?fields=all&key=${key}&token=${token}`;
    return fetch(url).then(r => r.json());
  },
  markCardWithLabel: (cardId, labelId) => {
    const url = `https://api.trello.com/1/cards/${cardId}?idLabels=${labelId}&key=${key}&token=${token}`;
    return fetch(url, { method: 'PUT' });
  },
  getCardsByColumnId: (columnId) => {
    const url = `https://trello.com/1/lists/${columnId}/cards?key=${key}&token=${token}`;
    return fetch(url).then(r => r.json());
  },
};
