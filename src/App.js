import { Component } from "react";
import AppRouter from "./router/AppRouter";
import { Route,Routes } from "react-router-dom";

export class App extends Component { 
  render(){
    return (
      <Routes>
        <Route path={"/*"} element={<AppRouter/>}></Route>
      </Routes>
    )
  }
}
export default App;