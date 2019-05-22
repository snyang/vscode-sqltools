import React from 'react';
import { WebviewMessageType } from '@sqltools/ui/lib/interfaces';
import Loading from '@sqltools/ui/components/Loading';
import QueryResult from './QueryResult';
import getVscode from '@sqltools/ui/lib/vscode';
import QueryResultsState from './State';
import '@sqltools/ui/sass/results.scss';
import { DatabaseInterface } from '@sqltools/core/plugin-api';

export default class ResultsScreen extends React.Component<{}, QueryResultsState> {
  state: QueryResultsState = { connId: null, isLoaded: false, resultMap: {}, queriesIds: [], error: null, activeQueryId: null };

  saveState = (data: (Partial<Pick<QueryResultsState, keyof QueryResultsState>> | QueryResultsState | null), cb = () => {}) => {
    this.setState(data as any, () => {
      cb();
      getVscode().setState(this.state);
    });
  }

  componentWillMount() {
    window.addEventListener('message', (ev) => {
      return this.messagesHandler(ev.data as WebviewMessageType);
    });
  }

  toggle(queryId: QueryResultsState['queriesIds'][number]) {
    this.saveState({
      activeQueryId: queryId,
    });
  }

  messagesHandler = ({ action, payload }: WebviewMessageType<any>) => {
    console.log(`Message received: ${action}`, ...[ payload ]);
    switch (action) {
      case 'queryResults':
        const results: DatabaseInterface.QueryResults[] = payload;
        const queriesIds = [];
        const resultMap = {};
        let connId: string;
        (Array.isArray(results) ? results : [results]).forEach((r) => {
          connId = r.connId;
          queriesIds.push(r.queryId);
          resultMap[r.queryId] = r;
        });
        this.saveState({
          connId,
          isLoaded: true,
          queriesIds,
          resultMap,
          error: null,
          activeQueryId: queriesIds[0],
        });
        break;
      case 'reset':
        this.saveState({ connId: null, isLoaded: false, resultMap: {}, queriesIds: [] });
        break;

      case 'getState':
        getVscode().postMessage({ action: 'receivedState', payload: this.state });
        break;
      default:
        break;
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return <Loading active />;
    } else if (this.state.isLoaded && this.state.error) {
      return (
        <div>
          <h2>Query errored. Check the logs.</h2>
          <h4>{this.state.error.toString()}</h4>
        </div>
      );
    }
    const tabs = this.state.queriesIds.map((queryId: string) => (
      <li
        title={this.state.resultMap[queryId].query}
        key={queryId}
        onClick={() => this.toggle(queryId)}
        className={'truncate ' + (this.state.activeQueryId === queryId ? 'active' : '')}
      >
        {(this.state.resultMap[queryId] && (this.state.resultMap[queryId].label || this.state.resultMap[queryId].query)) || queryId}
      </li>
    ));

    return (
      <div className='query-results-container fullscreen-container'>
        <ul className='tabs'>{tabs}</ul>
        <QueryResult
          {...this.state.resultMap[this.state.activeQueryId]}
        />
      </div>
    );
  }
}
