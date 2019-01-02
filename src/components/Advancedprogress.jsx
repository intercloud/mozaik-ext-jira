import React, { Component, PropTypes } from 'react';
import reactMixin  from 'react-mixin';
import { ListenerMixin } from 'reflux';
import Mozaik from 'mozaik/browser';
import { isDefined, createElementIf } from '../util';
import { Chart } from 'react-google-charts';

class Advancedprogress extends Component {

    getApiRequest() {
        const {
            credentials,
            baseurl,
            projectSlug,
            displayVersion,
            graphID,
            graphHeight,
            title
        } = this.props;

        return {
            id: `jira.advancedprogress.${title}.${baseurl}.${projectSlug}.${graphID}`,
            params: { title, credentials, baseurl, projectSlug, displayVersion, graphID, graphHeight}
        };
    }

    onApiData(advancedprogress) {
        this.setState(advancedprogress);
    }

    render() {

        const state = this.state || {};

        const {
            title,
            graphID,
            graphHeight
        } = this.props;

        const {
            nInVersion,
            nReported,
            nConfirmed,
            nToDo,
            nInProgress,
            nInCodeReview,
            nMerged,
            nReadyForTesting,
            nInTesting,
            nPassedTesting,
            nFailedTesting,
            nDone
        } = state;


        const content = typeof nInVersion === 'undefined'
            ? <span />
            : (
                <div className="issues__wrapper">
                    <div className={'my-pretty-chart-container'}>
                        <Chart
                            chartType="BarChart"
                            data={[
                                    ['Issue Type', 'Issues Done', 'Issues Failed Testing', 'Issues Passed Testing', 'Issues in Testing', 'Issues Ready for Testing', 'Issues Merged', 'Issues In Code Review', 'Issues In Progress', 'Issues To Do', 'Issues Confirmed', 'Issues Reported' ],
                                    ['Progress', nDone, nFailedTesting, nPassedTesting, nInTesting, nReadyForTesting, nMerged, nInCodeReview, nInProgress, nToDo, nConfirmed, nReported]
                                  ]}
                            options={{
                                    "legend":{position: 'top'},
                                    "hAxis": {
                                        "minValue": 0
                                    },
                                    "fontSize": 10,
                                    "isStacked": 'percent',
                                    "series": {
                                        0:{color:'#72b880'},
                                        1:{color:'#d17d7d'},
                                        2:{color:'#89c495'},
                                        3:{color:'#a1cfaa'},
                                        4:{color:'#b8dbbf'},
                                        5:{color:'#d0e7d4'},
                                        6:{color:'#ffedb9'},
                                        7:{color:'#fff6dc'},
                                        8:{color:'#92a3b5'},
                                        9:{color:'#b6c2ce'},
                                        10:{color:'#dae0e6'}
                                    }
                                    }}
                            graph_id={graphID}
                            width="100%"
                            height={graphHeight}
                            legend_toggle
                        />
                    </div>
                </div>
            );

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{{title}}</span>
                    <i className="fa fa-bar-chart" />
                    }
                </div>
                <div className="widget__body">
                    {content}
                </div>
            </div>
        );
    }
}

Advancedprogress.propTypes = {
    title: PropTypes.string
};

reactMixin(Advancedprogress.prototype, ListenerMixin);
reactMixin(Advancedprogress.prototype, Mozaik.Mixin.ApiConsumer);

export default Advancedprogress;