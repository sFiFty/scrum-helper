import React from 'react'
import {Form, List, Image, Icon} from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default class SelectableTeams extends React.Component {
	render() {
		const {teams, selectTeam, selectedTeamId} = this.props
		return (
      <Form.Field className="teams-to-choose d-flex flex-row">
      {
        _.keys(teams).map((teamKey, index) => {
          const selectedClass = selectedTeamId === teamKey ? 'selected' : null
          const classes = `${selectedClass} team-box font-s p-3 text-white`
          return <div 
            style={{backgroundColor: teams[teamKey].color}} 
            className={classes}
            onClick={() => selectTeam(teamKey)} 
            key={index}> 
            <Icon className="checkmark-icon" size="big" name="checkmark" color="black" />
            <div className="overlay-block"></div>
            <span>{teams[teamKey].name}</span> 
          </div>
        })
      }
      </Form.Field>
    )
  }

	static propTypes = {
		teams: PropTypes.object.isRequired,
		selectTeam: PropTypes.func.isRequired
	}
}