import { Component, PureComponent } from "preact";
import { connect } from "unistore/preact";
import { actions } from "./state";
import {BoundingClientRectComponent} from './bounding_client_rect';


class CardTable extends Component {

  render(props) {
    let { refCallback } = props;
    console.log("[CardTable][render]", this.props.boundingClientRect);
    return (
      <div class="card-table" ref={r => refCallback ? refCallback.call(refCallback, r) : null}>
        {props.children}
      </div>
    );
  }
}


export default connect(["tableDims", "isVisible"], actions)(
  BoundingClientRectComponent(CardTable)
);


