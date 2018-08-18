import React, { PureComponent } from 'react';
import { Button, Icon } from 'semantic-ui-react/dist/commonjs';
import { Link } from 'react-router-dom';

import './styles.scss';

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="footer-wrapper text-center d-flex justify-content-around">
        <div>
          <a target="_blank" href="https://github.com/sFiFty/my-helper/">
            <Button size="mini"><Icon name="github" size="small" />Github</Button>
          </a>
          <span className="footer-text font-xs mt-1 ml-2">
            Created and maintained by
            <a target="_blank" href="https://www.facebook.com/rudinaleksandr">Alex Rudin</a>.
          </span>
        </div>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </footer>
    );
  }
}
