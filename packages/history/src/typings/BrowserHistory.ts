import { State } from './State'
import { History } from './History'

/**
 * A browser history stores the current location in regular URLs in a web
 * browser environment. This is the standard for most web apps and provides the
 * cleanest URLs the browser's address bar.
 *
 * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md#browserhistory
 */
export interface BrowserHistory<
  S extends State = Record<string, unknown> | null
> extends History<S> {}
