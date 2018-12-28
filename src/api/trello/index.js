const { Trello } = window;
const AUTH_TYPE = 'popup';
const APP_NAME = 'Scrum Helper';

export default class TrelloApi {
  connect = () => new Promise((resolve, reject) => (
    Trello.authorize({
      type: AUTH_TYPE,
      name: APP_NAME,
      scope: {
        read: true,
        write: true,
        account: true,
      },
      success: () => resolve(),
      error: () => reject(),
      expiration: 'never',
    })
  ))
}
