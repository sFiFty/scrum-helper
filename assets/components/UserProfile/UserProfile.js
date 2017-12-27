import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import SMLoader from '../SMLoader/SMLoader'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { Card, Icon, Image } from 'semantic-ui-react'

export default class UserProfile extends React.Component {
    static propTypes = {
        myUser: PropTypes.object,
        firebase: PropTypes.object
    }
    render() {
        let { myUser } = this.props
        const userProfile = !isLoaded(myUser)
            ? <SMLoader />
            : isEmpty(myUser)
            ? 'No profile for this user'
            :   
            <Card>
                <Image size="medium" src={myUser.avatar} />
                <Card.Content>
                    <Card.Header>
                        {myUser.displayName}
                    </Card.Header>
                    <Card.Meta>
                        Verification type: {myUser.verificationType}
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    Email: {myUser.email}
                </Card.Content>
            </Card>
        return (
            <Paper zDepth={2} className="row">
                { userProfile }
            </Paper>
        )
    }
}