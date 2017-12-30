import React from 'react'
import { Table, Icon } from 'semantic-ui-react'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'

export default class TableFooter extends React.Component {
    render() {
         return (
            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan='4'>
                        <RaisedButton
                            label="Add member"
                            labelPosition="before"
                            style={{float: 'right', height: 30, fontSize: 12}}
                            icon={<Icon size="large" color="black" name='user' />}
                            containerElement={<Link to="/add" />}
                        />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        )
    }
}