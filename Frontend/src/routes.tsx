import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar_layout from "./components/myComponents/sidebar_layout";
import LiveConsole from "./pages/LiveConsole";
import Records from "./pages/Records";
import AddRecords from "./pages/AddRecords";
import Dropped from "./pages/Dropped";
import UnDropped from "./pages/UnDropped";
import LiveStatus from "./pages/LiveStatus";
import Rfid from "./pages/Rfid";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          element={
            <Sidebar_layout>
              <Dashboard />
            </Sidebar_layout>
          }
        />
        <Route
          path="/Console"
          element={
            <Sidebar_layout>
              <LiveConsole />
            </Sidebar_layout>
          }
        />
        <Route
          path="/Status"
          element={
            <Sidebar_layout>
              <LiveStatus />
            </Sidebar_layout>
          }
        />
        <Route
          path="/Records"
          element={
            <Sidebar_layout>
              <Records />
            </Sidebar_layout>
          }
        />
        <Route
          path="/Records/UnDropped"
          element={
            <Sidebar_layout>
              <UnDropped />
            </Sidebar_layout>
          }
        />
        <Route
          path="/Records/Dropped"
          element={
            <Sidebar_layout>
              <Dropped />
            </Sidebar_layout>
          }
        />
        {/* <Route
          path="/Records/rfid"
          element={
            <Sidebar_layout>
              <Rfid />
            </Sidebar_layout>
          }
        /> */}
        <Route
          path="/Records/AddNew"
          element={
            <Sidebar_layout>
              <AddRecords />
            </Sidebar_layout>
          }
        />
      </Switch>
    </BrowserRouter>
  );
}
