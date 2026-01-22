import { StatePageTemplate } from '../../components/StatePageTemplate';
import { STATE_CONTENT } from '../../data/state-content';

export const metadata = STATE_CONTENT['DC'].metadata;

export default function DCTEYPage() {
  return <StatePageTemplate stateCode="DC" content={STATE_CONTENT['DC']} />;
}
