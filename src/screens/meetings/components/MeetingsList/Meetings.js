import React, { Component } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Meeting from '../Meeting';
import './styles.scss';

const propTypes = {
  dailyMeetings: PropTypes.object,
  estimationMeetings: PropTypes.object,
  auth: PropTypes.object,
  firebase: PropTypes.object,
};

const defaultProps = {
  dailyMeetings: {},
  estimationMeetings: {},
};


export default class Meetings extends Component {
  state = {
    meetings: [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const meetings = Meetings.getMeetings(nextProps);
    return {
      meetings,
    };
  }

  static getMeetings = (props) => {
    const meetings = [];
    const { dailyMeetings, estimationMeetings } = props;
    _.keys(dailyMeetings).map((key) => {
      if (dailyMeetings[key].isDeleted) return;
      meetings.push({
        key,
        type: 'daily',
        ...dailyMeetings[key],
      });
    });

    _.keys(estimationMeetings).map((key) => {
      meetings.push({
        key,
        type: 'estimation',
        ...estimationMeetings[key],
      });
    });

    return meetings;
  }

  render() {
    const { meetings } = this.state;
    const { auth, firebase } = this.props;
    return (
      <Container className="meetings-container">
        <div className="d-flex justify-content-center flex-wrap">
          {
            meetings.length > 0
            && meetings.map(m => <Meeting firebase={firebase} key={m.key} uid={auth.uid} meeting={m} />)
          }
          <Link to="daily/create">
            <div className="add-meeting-container d-flex flex-column justify-content-start align-items-center">
              <div className="icon-container d-flex justify-content-center align-items-center">
                <div className="icon-background d-flex justify-content-center align-items-center">
                  <i className="fas fa-plus" />
                </div>
              </div>
              <div className="text font-l">

                Add Meeting
              </div>
            </div>
          </Link>
        </div>
      </Container>
    );
  }
}

Meetings.propTypes = propTypes;
Meetings.defaultProps = defaultProps;
