import { StatePageTemplate } from '../../components/StatePageTemplate';
import { STATE_CONTENT } from '../../data/state-content';

export const metadata = STATE_CONTENT['NY'].metadata;

export default function NewYorkTEYPage() {
  return <StatePageTemplate stateCode="NY" content={STATE_CONTENT['NY']} />;
}
