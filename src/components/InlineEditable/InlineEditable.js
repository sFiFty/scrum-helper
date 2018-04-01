import React from 'react'
import PropTypes from 'prop-types'
import {Button, List, Input} from 'semantic-ui-react'

export default class InlineEditable extends React.Component {

	state = {
    text: this.props.text,
    isEditing: false
	}

  setText = event => this.setState({text: event.target.value})
  
  hideEditing = () => this.setState({ isEditing: false })

  showEditing = () => this.setState({ isEditing: true })
  
	
	render() {
    const {placeholder, onChange} = this.props
    const {text, isEditing} = this.state
		return (
      isEditing ?
      <List.Content className="d-flex flex-row justify-content-between align-items-center">
        <Input size="mini" onChange={this.setText} value={text} placeholder={placeholder} />
        <div>
          <Button secondary size="mini" onClick={() => onChange(text)}>Save</Button>
          <Button basic size="mini" onClick={this.hideEditing}>Cancel</Button>
        </div>
      </List.Content> :
      <List.Content className="d-flex flex-row justify-content-between align-items-center">
        <div className="font-m">{text}</div>
        <Button basic size="mini" onClick={this.showEditing}>Edit</Button>
      </List.Content> 
		)
	}
	
	static propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    text: PropTypes.string
	}

}