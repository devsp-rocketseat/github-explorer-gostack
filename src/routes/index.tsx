import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Repository from '../pages/Repository'

const Routes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/repository' component={Repository} />
            <Route path='/' component={Dashboard} />
        </Switch>
    </BrowserRouter>
)

export default Routes
