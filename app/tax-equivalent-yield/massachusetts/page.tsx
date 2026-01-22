import { StatePageTemplate } from '../../components/StatePageTemplate';
import { STATE_CONTENT } from '../../data/state-content';

export const metadata = STATE_CONTENT['MA'].metadata;

export default function MassachusettsTEYPage() {
  return <StatePageTemplate stateCode="MA" content={STATE_CONTENT['MA']} />;
}
