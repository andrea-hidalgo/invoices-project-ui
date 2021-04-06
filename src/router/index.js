import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';

export default function AppRouter () {
    return (
        <Router>
            <Switch>
                {routes.map(({Component, key, path}) => (
                    <Route  
                        key={key}
                        path={path}
                        component={props => <Component page={key} {...props} />}
                    ></Route>
                    
                ))}
            </Switch>
        </Router>
    )
}
