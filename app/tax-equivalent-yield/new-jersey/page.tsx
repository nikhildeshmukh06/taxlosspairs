import { StatePageTemplate } from '../../components/StatePageTemplate';
import { STATE_CONTENT } from '../../data/state-content';

export const metadata = STATE_CONTENT['NJ'].metadata;

export default function NewJerseyTEYPage() {
  return <StatePageTemplate stateCode="NJ" content={STATE_CONTENT['NJ']} />;
}
