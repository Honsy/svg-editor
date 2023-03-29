import React, { ComponentLifecycle } from "react";


export class GraphBaseComponent<P = {}, S = {}> extends React.Component<P, S> {
  constructor(props) {
    super(props);
  }
}