import { StatePageTemplate } from '../../components/StatePageTemplate';
import { STATE_CONTENT } from '../../data/state-content';

export const metadata = STATE_CONTENT['HI'].metadata;

export default function HawaiiTEYPage() {
  return <StatePageTemplate stateCode="HI" content={STATE_CONTENT['HI']} />;
}
