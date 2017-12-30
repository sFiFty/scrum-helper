import React from 'react'
import { Table, Icon } from 'semantic-ui-react'
import Toggle from 'material-ui/Toggle'

export default class MemberCell extends React.Component {
    render() {
        const { employee, id, handleOpen, toggleAvailability } = this.props
        return (
            <Table.Row>
                <Table.Cell>
                    { employee.firstName } { employee.lastName }
                </Table.Cell>
                <Table.Cell>
                    <Toggle 
                        style={{width: 50}}
                        defaultToggled={employee.availability} 
                        onToggle={() => toggleAvailability(id)}
                    />
                </Table.Cell>
                <Table.Cell>
                    <Icon onClick={() => { handleOpen(id) }} name='delete' size="large" color="red" />
                </Table.Cell>
            </Table.Row>
        )
    }
}