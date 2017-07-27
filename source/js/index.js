import React from "react";
import ReactDOM from "react-dom";
import "../scss/style.scss";
import heart from "../assets/img/heart.svg";


class App extends React.Component {

  render() {
    return (
      <div className="app">
        <h1>Webpack boilerplate</h1>
      <svg>
        <use xlinkHref={`#${heart.id}`}/>
      </svg>
      </div>
    )
  }
}
;


ReactDOM.render(<App/>, document.getElementById('root'))