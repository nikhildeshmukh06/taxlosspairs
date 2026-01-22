import { StatePageTemplate } from '../../components/StatePageTemplate';
import { STATE_CONTENT } from '../../data/state-content';

export const metadata = STATE_CONTENT['OR'].metadata;

export default function OregonTEYPage() {
  return <StatePageTemplate stateCode="OR" content={STATE_CONTENT['OR']} />;
}
