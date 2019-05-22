import { DatabaseInterface } from '@sqltools/core/plugin-api';
export default interface QueryResultsState {
  connId: string;
  activeQueryId?: string;
  isLoaded: boolean;
  error?: any;
  queriesIds: string[];
  resultMap: {
    [query: string]: DatabaseInterface.QueryResults;
  };
}
