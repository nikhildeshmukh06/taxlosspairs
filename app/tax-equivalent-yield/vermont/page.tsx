import { StatePageTemplate } from '../../components/StatePageTemplate';
import { STATE_CONTENT } from '../../data/state-content';

export const metadata = STATE_CONTENT['VT'].metadata;

export default function VermontTEYPage() {
  return <StatePageTemplate stateCode="VT" content={STATE_CONTENT['VT']} />;
}
