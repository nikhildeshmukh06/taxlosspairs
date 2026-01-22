import { StatePageTemplate } from '../../components/StatePageTemplate';
import { STATE_CONTENT } from '../../data/state-content';

export const metadata = STATE_CONTENT['CA'].metadata;

export default function CaliforniaTEYPage() {
  return <StatePageTemplate stateCode="CA" content={STATE_CONTENT['CA']} />;
}
