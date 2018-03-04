import React from 'react'
import {Icon, Button, Modal, Header, Input} from 'semantic-ui-react'

export default class EmailModal extends React.Component {
	render() {
		return (
        <Modal size="tiny" open={true} trigger={<Button basic className="ml-5 mr-5 w-25">Enter new email</Button> }>
          <Header icon='mail' content='Change Your Email' />
          <Modal.Content>
            <Input placeholder='Type email here...' />
          </Modal.Content>
        </Modal>
		)
	}
}

