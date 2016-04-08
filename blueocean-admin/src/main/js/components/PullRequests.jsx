import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ajaxHoc from '../AjaxHoc';
import Table from './Table';
import PullRequest from './PullRequest';
import { RunsRecord } from './records';
import { urlPrefix } from '../config';

export class PullRequests extends Component {
    render() {
        const { pipeline, data } = this.props;

        if (!data || !pipeline) {
            return null;
        }
        const headers = ['Status', 'Latest Build', 'Summary', 'Author', 'Completed'];

        return (
            <main>
                <article>
                    <Table headers={headers}>
                        { data.filter((run) => run.get('pullRequest')).map((run, index) => {
                            const result = new RunsRecord(run.toJS());
                            return (<PullRequest
                              key={index}
                              pr={result}
                            />);
                        })}

                        <tr>
                            <td colSpan={headers.length}>
                                <Link className="btn" to={urlPrefix}>Dashboard</Link>
                            </td>
                        </tr>
                    </Table>
                </article>
            </main>
        );
    }
}

PullRequests.propTypes = {
    pipeline: PropTypes.object,
    data: PropTypes.object,
};

// Decorated for ajax as well as getting pipeline from context
export default ajaxHoc(PullRequests, (props, config) => {
    if (!props.pipeline) return null;
    return `${config.getAppURLBase()}/rest/organizations/jenkins` +
        `/pipelines/${props.pipeline.name}/branches`;
});