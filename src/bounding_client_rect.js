import { Component } from "preact";

export function BoundingClientRectComponent(WrappedComponent) {
  return class Wrapper extends Component {
    constructor() {
      super();
      this._updateDimensions = this._updateDimensions.bind(this);
    }

    componentDidMount() {
      window.addEventListener("resize", this._updateDimensions);
      // console.log("[BoundingClientRectComponent][componentDidMount]", this.ref);
      this._updateDimensions();
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this._updateDimension);
    }

    _updateDimensions() {
      // console.log("[BoundingClientRectComponent][_updateDimensions]", this);

      if (this.ref) {
        let { x, y, width, height } = this.ref.getBoundingClientRect();
        // sometimes invalid dimensions will get passed through
        if (x === 0 && y === 0 && width === 0 && height === 0) {
          return;
        }

        let boundingClientRect = [x, y, width, height];
        // console.log(
        //   "[BoundingClientRectComponent][_updateDimensions",
        //   boundingClientRect, this.ref
        // );
        this.boundingClientRect = boundingClientRect;
        this.setState({ boundingClientRect });

        if (this.props.onBoundingClientRectUpdate) {
          this.props.onBoundingClientRectUpdate(this);
        }
      }
    }

    render() {
      // in certain circumstances, for example when a child is positioned absolutely
      // the wrapping span ref will not return the correct dimensions.
      // we use the refCallback rather than the ref on a wrapped span so that
      // the child component can choose which element is dimensioned.

      // console.log("[BoundingClientRectComponent]", "[render]");
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          refCallback={r => (this.ref = r)}
        >
          {this.props.children}
        </WrappedComponent>
      );
    }
  };
}

export default BoundingClientRectComponent;
