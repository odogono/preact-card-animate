import "./style";
import { Component, render } from "preact";
import Card from "./card";
import Placeholder from "./placeholder";
import { Provider, connect } from "unistore/preact";
import { store } from "./state";
import CardTable from "./card_table";

console.log(">--");

export default class App extends Component {
  constructor() {
    super();
    this._updatePlaceholder = this._updatePlaceholder.bind(this);
    this._updateCardTable = this._updateCardTable.bind(this);
    this.state = {
      cards: [{ id: "c1", placeholder: "ph1" }],
      placeholders: [{id:'ph1'}, {id:'ph2'}],
      placeholderRefs: {}
    };
    // this.placeholders = {};
  }

  _updateCardTable(cardTable) {
    console.log(
      "[App][_updateCardTable]",
      cardTable.boundingClientRect || cardTable.state.boundingClientRect,
      cardTable
    );
    this.cardTableRect = cardTable.boundingClientRect;
  }

  _updatePlaceholder(placeholder) {
    
    let placeholderRefs = this.state.placeholderRefs;
    placeholderRefs[placeholder.props.id] = placeholder;
    this.setState({ placeholderRefs });
    console.log(
      "[App][_updatePlaceholder]",
      placeholder.props.id,
      placeholder.boundingClientRect || placeholder.state.boundingClientRect,
      placeholder,
      placeholderRefs
    );
  }

  componentDidMount() {
    console.log("[App][componentDidMount]");
  }

  render(props) {
    let cards = this._renderCards();
    let placeholders = this.state.placeholders.map( ph => <Placeholder id={ph.id} onBoundingClientRectUpdate={this._updatePlaceholder} /> );
    
    // we don't use ref on the placeholders to obtain the clientRect, as it
    // returns before it is able to obtain said clientRect.
    return (
      <Provider store={store}>
        <div>
          <h1>Cards</h1>
          <CardTable onBoundingClientRectUpdate={this._updateCardTable}>
            {cards}
            {placeholders}
          </CardTable>
        </div>
      </Provider>
    );
  }

  _renderCards() {
    // console.log("[App][_renderCards]", "placeholders", this.placeholders);
    return this.state.cards.map(c => {
      let placeholder = this.state.placeholderRefs[c.placeholder];
      if (!placeholder || !placeholder.boundingClientRect) {
        return null;
      }
      // console.log(
      //   "[App][_renderCards]",
      //   c.id,
      //   "@",
      //   placeholder.boundingClientRect
      // );

      let [x,y] = placeholder.boundingClientRect;
      // if the cardtable div is position:relative, then adjust card
      // position
      x -= this.cardTableRect[0];
      y -= this.cardTableRect[1];

      return (
        <Card
          position={[x,y]}
          placeholder={c.placeholder}
        />
      );
    });
  }
}

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}
