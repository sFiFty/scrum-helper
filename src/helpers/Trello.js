export default class Trello {

  auth = () => (
    new Promise((resolve, reject) => (
      window.Trello.authorize({
        type: 'popup',
        name: 'Scrum Helper',
        scope: {
          read: true,
          write: true,
          account: true,
        },
        success: resolve,
        error: reject,
        expiration: 'never',
      })
    ))
  )

  request = (method, url) => (
    new Promise((resolve, reject) => (
      window.Trello.rest(
        method,
        url,
        data => resolve(data),
        (err) => {
          console.log(err)
        },
      )
    ))
  )
}
