/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface JQuery {
    collapsible(): JQuery;
    collapsible(options): JQuery;
    collapsible(action, n): JQuery;
}