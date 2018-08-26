import React from 'react';
import PropTypes from 'prop-types';
import { Button, List, Input } from 'semantic-ui-react';

const propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default class InlineEditable extends React.Component {
	state = {
	  text: this.props.text,
	  isEditing: false,
	  value: this.props.text,
	}

  setText = event => this.setState({ text: event.target.value })

  hideEditing = () => this.setState({ isEditing: false, text: this.state.value })

  showEditing = () => this.setState({ isEditing: true })

  onSave = (text) => {
    this.props.onChange(text);
    this.setState({ value: text });
  }

  render() {
    const { placeholder } = this.props;
    const { text, isEditing } = this.state;
    return (
      isEditing
        ? (
          <List.Content className="d-flex flex-row justify-content-between align-items-center">
            <Input size="mini" onChange={this.setText} value={text} placeholder={placeholder} />
            <div>
              <Button secondary size="mini" onClick={() => this.onSave(text)}>Save</Button>
              <Button basic size="mini" onClick={this.hideEditing}>Cancel</Button>
            </div>
          </List.Content>
        )
        : (
          <List.Content className="d-flex flex-row justify-content-between align-items-center">
            <div className="font-m">{text}</div>
            <Button basic size="mini" onClick={this.showEditing}>Edit</Button>
          </List.Content>
        )
    );
  }
}

InlineEditable.propTypes = propTypes;
