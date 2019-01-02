import React, { Component, PropTypes } from 'react';
import reactMixin  from 'react-mixin';
import { ListenerMixin } from 'reflux';
import Mozaik from 'mozaik/browser';
import { isDefined, createElementIf } from '../util';

class Count extends Component {

    getApiRequest() {
        const {
            baseurl,
            projectSlug,
            displayVersion,
            display
        } = this.props;

        return {
            id: `jira.count.${baseurl}.${projectSlug}.${display}.${displayVersion}`,
            params: { baseurl, projectSlug, displayVersion, display}
        };
    }

    onApiData(count) {
        this.setState(count);
    }

    render() {
        const state = this.state || {};

        const {
        } = this.props;

        const {
            count,
            display
        } = state;
        
        if(display){
            var classDisplay = display.split(' ').join('-');
        }
        
        const className = 'jira__current-count-' + classDisplay;

        if(display === "version"){
            var title = "Version";
        }
        else
        {
            var title = "Issues " + display;
        }
        

        const content = typeof status === 'undefined'
            ? <span />
            : (
                <div className="jira__wrapper">
                    <span className="jira__current-wrapper">
                        <span className={className}>
                            {count}
                        </span>
                    </span>
                </div>
            );

        return (
            <div>
                <div className="widget__header">
                    <span className="jira__widget__header__subject">{{title}}</span>
                </div>
                <div className="jira__widget__body">
                    {content}
                </div>
            </div>
        );
    }
}

reactMixin(Count.prototype, ListenerMixin);
reactMixin(Count.prototype, Mozaik.Mixin.ApiConsumer);

export default Count;