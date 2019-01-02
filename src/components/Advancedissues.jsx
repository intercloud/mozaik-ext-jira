import React, { Component, PropTypes } from 'react';
import reactMixin  from 'react-mixin';
import { ListenerMixin } from 'reflux';
import Mozaik from 'mozaik/browser';
import { isDefined, createElementIf } from '../util';
import JsonTable from 'react-json-table';

class Advancedissues extends Component {

    getApiRequest() {
        const {
            credentials,
            baseurl,
            projectSlug,
            displayVersion,
            title
        } = this.props;

        return {
            id: `jira.advancedissues.${title}.${baseurl}.${projectSlug}`,
            params: { title, credentials, baseurl, projectSlug, displayVersion}
        };
    }

    onApiData(advancedissues) {
        this.setState(advancedissues);
    }

    render() {

        const state = this.state || {};

        const {
            title
        } = this.props;

        const {
            advancedTable,
            cVersion
        } = state;


        const content = typeof advancedTable === 'undefined'
            ? <span />
            : (
                <div className="issues__wrapper">
                    <JsonTable rows={advancedTable} />
                </div>
            );

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{{title}}</span>
                    <span className="widget__header__count">
                        <span className="label">Current Development Version: {cVersion}</span>
                    </span>
                    <i className="fa fa-bar-chart" />
                </div>
                <div className="widget__body">
                    {content}
                </div>
            </div>
        );
    }
}

Advancedissues.propTypes = {
    title: PropTypes.string
};

reactMixin(Advancedissues.prototype, ListenerMixin);
reactMixin(Advancedissues.prototype, Mozaik.Mixin.ApiConsumer);

export default Advancedissues;