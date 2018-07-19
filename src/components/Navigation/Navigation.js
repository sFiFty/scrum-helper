import React, { PureComponent } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';

export default class Navigation extends PureComponent {
  state = {
    activeItem: null,
  }

  handleItemClick = (e, { name }) => {
    const { hideMenu } = this.props;
    if (hideMenu) hideMenu();
    this.setState({ activeItem: name });
  }

  componentWillMount() {
    const { location } = this.props;
    this.changeMenuActiveItem(location.pathname);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      this.changeMenuActiveItem(location.pathname);
    }
  }

  changeMenuActiveItem = (path) => {
    switch (path) {
      case '/':
        this.setState({ activeItem: 'Home' });
        break;
      case '/meetings':
        this.setState({ activeItem: 'Meetings' });
        break;
      case '/teams':
        this.setState({ activeItem: 'Teams' });
        break;
      case '/contacts':
        this.setState({ activeItem: 'Contact Us' });
        break;
      case '/estimation':
        this.setState({ activeItem: 'Estimation' });
        break;
      default:
        this.setState({ activeItem: null });
        break;
    }
  }

  render() {
    const { activeItem } = this.state;
    const { auth, vertical } = this.props;
    const menuItems = [
      { to: '/', name: 'Home', public: true },
      { to: '/contacts', name: 'Contact Us', public: true },
      { to: '/teams', name: 'Teams' },
      { to: '/meetings', name: 'Meetings' },
      // { to: '/estimation', name: 'Estimation' }
    ];
    return (
      <div className={vertical ? 'vertical-menu' : 'navigation-wrapper'}>
        <Menu secondary={!vertical} vertical={vertical} fluid={vertical}>
          {
            isLoaded(auth)
            && menuItems.map((item, index) => {
              if (auth.isEmpty && !item.public) return;
              return (
                <Menu.Item
                  key={index}
                  as={Link}
                  to={item.to}
                  name={item.name}
                  active={activeItem === item.name}
                  onClick={this.handleItemClick}
                />
              );
            })
          }
        </Menu>
      </div>
    );
  }

  static propTypes = {
    auth: PropTypes.object,
    vertical: PropTypes.bool,
  }
}
