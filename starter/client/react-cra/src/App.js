import {BrowserRouter as Switch, Route} from 'react-router-dom'
import PaymentForm from './PaymentForm'

const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <PaymentForm />
      </Route>
    </Switch>
  )
}

export default App;
