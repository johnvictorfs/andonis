import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Homepage from '@/pages/Homepage'

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" component={Homepage} />
    </Switch>
  </Router>
)

export default Routes
