import React, {Component} from 'react'
import {Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import './styles.scss'

export default class Footer extends Component {
  render() {
    return (
      <footer className='footer-wrapper text-center mt-5'>
        <a target="_blank" href="https://github.com/sFiFty/my-helper/">
          <Button size='mini font-s'> 
            <Icon name='github' size="large" />
            Github
          </Button>
        </a>
        <div className="footer-text font-s mt-2">
          Created and maintained by <a target="_blank" href="https://www.facebook.com/rudinaleksandr">Alex Rudin</a>.
        </div>
      </footer>
    )
  }
}
