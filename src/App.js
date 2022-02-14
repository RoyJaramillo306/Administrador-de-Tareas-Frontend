import React from "react";
import ActividadState from "./contexts/actividades/ActividadState";
import HomeState from "./contexts/dashboard/homeState";
import AlertaState from './contexts/alertas/alertaState';
import AuthState from "./contexts/auth/authState";
import AppRouter from "./routers/AppRouter";

function App() {
  return (
      <AuthState>
        <HomeState>
          <ActividadState>
            <AlertaState>
              <AppRouter></AppRouter>
            </AlertaState>
          </ActividadState>
        </HomeState>
      </AuthState>
  );
}

export default App;
