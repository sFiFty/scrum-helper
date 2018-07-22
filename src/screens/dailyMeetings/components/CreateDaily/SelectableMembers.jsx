import React from 'react';
import { Form, Icon, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  selectedTeamId: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddMember: PropTypes.func.isRequired,
}

export default class SelectableMembers extends React.Component {
  render() {
    const { 
      selectedTeamId, members, selectedNames, onAddMember 
    } = this.props;
    return (
      <Form.Field className="mt-5">
        {
          members.length === 0
          ? (
            <div className="font-m">
              <span>Your team is empty. Do you want to add member?</span>
              <Link className="ml-3 text-link" to={`/teams/${selectedTeamId}/addMember`}>
                Add member <Icon name="arrow right" />
              </Link>
            </div>
          ) :									
          (
            <Dropdown
              placeholder="Team members"
              multiple
              onChange={onAddMember}
              selection
              value={selectedNames || []}
              options={members || []}
            />
          )
        }
      </Form.Field>
    );
  }
}

SelectableMembers.propTypes = propTypes;
