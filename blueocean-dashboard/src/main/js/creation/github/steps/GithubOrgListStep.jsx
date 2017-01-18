import React, { PropTypes } from 'react';
import FlowStep from '../../flow2/FlowStep';
import { observer } from 'mobx-react';

@observer
export default class GithubOrgListStep extends React.Component {

    selectOrganization(org) {
        this.props.flowManager.selectOrganization(org);
    }

    render() {
        const { flowManager } = this.props;

        return (
            <FlowStep {...this.props} title="In which Github organization are your repositories located?">
                {flowManager.organizations.map(org => (
                    <button onClick={() => this.selectOrganization(org)}>{org.name}</button>
                ))}
            </FlowStep>
        );
    }
}

GithubOrgListStep.propTypes = {
    flowManager: PropTypes.object,
};
