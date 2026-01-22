import { StatePageTemplate } from '../../components/StatePageTemplate';
import { STATE_CONTENT } from '../../data/state-content';

export const metadata = STATE_CONTENT['CT'].metadata;

export default function ConnecticutTEYPage() {
  return <StatePageTemplate stateCode="CT" content={STATE_CONTENT['CT']} />;
}
