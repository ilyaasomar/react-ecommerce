import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import PublicRoutesList from '../../routes/Publicroutelist';
const FrontendLayout = () => {
    return (

        <div>
            <Navbar />
          
                <Switch>
        {PublicRoutesList.map((routedata, idx) => {
            return (
                routedata.component && (
                    <Route
                    key={idx}
                    path={routedata.path}
                    exact={routedata.exact}
                    name={routedata.name}
                    render={(props) => (
                        <routedata.component {...props} />
                    )}

                    />
                )
            );
        })}
                </Switch>
              
        </div>
    );
}

export default FrontendLayout;
