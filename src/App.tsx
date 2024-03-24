import Layout from 'components/layout';
import Articles from 'components/articles';
import { ArticleSkeleton } from 'components/ui/skeletons';

export default function App() {
  return (
    <Layout>
      <Articles />
      <ArticleSkeleton className="p-4" />
    </Layout>
  );
}
