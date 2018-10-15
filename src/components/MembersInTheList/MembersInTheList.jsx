import React from 'react';
import {
  Image, Icon, Popup, Header, Grid,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const propTypes = {
  members: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      avatar: PropTypes.string,
      initials: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  deleteMember: PropTypes.func.isRequired,
  parent: PropTypes.string.isRequired,
};

const defaultProps = {
  members: null,
};

class MemberListInTeam extends React.Component {
  render() {
    const { members, deleteMember, parent } = this.props;
    console.log(members)
    return (
      <div className="member-list">
        {
					members && (
            <div>
              {
                _.keys(members).map((k) => {
                  const avatar = members[k].avatar ? require(`Images/${members[k].avatar}`) : null;
                  return (
                    <Popup
                      key={k}
                      trigger={<Image src={avatar} avatar />}
                      flowing
                      hoverable
                    >
                      <Grid className="member-popup-details" verticalAlign="middle" centered columns={3}>
                        <Grid.Column textAlign="center">
                          <Image src={avatar} />
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <Header as="h4">
                            {members[k].name}
                          </Header>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <Icon onClick={() => deleteMember({ ...members[k], id: k }, parent)} size="large" name="remove" color="red" />
                        </Grid.Column>
                      </Grid>
                    </Popup>
							    );
							  })
					  	} 
            </div>
					)
				}
      </div>
    );
  } 
}

MemberListInTeam.propTypes = propTypes;
MemberListInTeam.defaultProps = defaultProps;

export default MemberListInTeam;
