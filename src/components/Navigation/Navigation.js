import React, {PureComponent} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import './styles.scss'
import Auth from 'Components/Auth'

export default class Navigation extends PureComponent {
  state = { 
    activeItem: null 
  }
  handleItemClick = (e, { name }) => {
    this.setState({activeItem: name})
  }

  componentWillMount() {
    const {location} = this.props
    this.changeMenuActiveItem(location.pathname)
  }

  componentDidUpdate(prevProps) {
    const {location} = this.props
    if (location !== prevProps.location) {
      this.changeMenuActiveItem(location.pathname)
    }
  }

  changeMenuActiveItem = path => {
    switch(path) {
      case '/daily': 
        this.setState({activeItem: 'Daily'})
        break
      case '/teams': 
        this.setState({activeItem: 'Teams'})
        break
      default: 
        this.setState({activeItem: null})
        break
    }
  }

  render() {
    const {activeItem} = this.state
    return (
      <div className="navigation-wrapper col-9">
        <div className="row">
          <div className="col-9">
            <Menu inverted>
              <Menu.Item as={Link} to="/teams" name='Teams' active={activeItem === 'Teams'} onClick={this.handleItemClick} />
              <Menu.Item as={Link} to="/daily" name='Daily' active={activeItem === 'Daily'} onClick={this.handleItemClick} />
              <Menu.Menu position='right'>
              </Menu.Menu>
            </Menu>
          </div>
          <div className="col-3 text-right avatar-container"><Auth /></div>
        </div>
      </div>
    )
  }
}