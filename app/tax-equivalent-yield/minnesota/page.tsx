import { StatePageTemplate } from '../../components/StatePageTemplate';
import { STATE_CONTENT } from '../../data/state-content';

export const metadata = STATE_CONTENT['MN'].metadata;

export default function MinnesotaTEYPage() {
  return <StatePageTemplate stateCode="MN" content={STATE_CONTENT['MN']} />;
}
