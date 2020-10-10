import TextField from './components/text-field';
import { applyClass } from './utils';

applyClass(TextField, `[type^="te"], [type="email"], [type="search"]`);
