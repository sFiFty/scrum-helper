import React, {PureComponent} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {isLoaded, isEmpty} from 'react-redux-firebase'
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
      case '/': 
        this.setState({activeItem: 'Home'})
        break
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
    const {auth} = this.props
    const menuItems = [
      { to: '/', name: 'Home', public: true },
      { to: '/teams', name: 'Teams' },
      { to: '/daily', name: 'Daily' },
    ]
    return (
      <div className="navigation-wrapper col-9">
        <div className="row">
          <div className="col-9  ">
            <Menu inverted>
              {
                isLoaded(auth) && 
                menuItems.map((item, index) => {
                  if (auth.isEmpty && !item.public) return
                  return (
                    <Menu.Item 
                      key={index}
                      as={Link} 
                      to={item.to} 
                      name={item.name}  
                      active={activeItem === item.name} 
                      onClick={this.handleItemClick} />
                  )
                })
              }
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