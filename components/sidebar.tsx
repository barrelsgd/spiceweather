import { Navigation } from './navigation';
import { Theme } from './theme';

export const Sidebar = () => (
  <div className="sticky top-24 hidden flex-col justify-center p-4 md:block">
    <Navigation />
    <div className="absolute bottom-0 left-0 p-4">
      <Theme />
    </div>
  </div>
);
