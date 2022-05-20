import { render } from '@testing-library/react';

import ModuleManager from './module-manager';

describe('ModuleManager', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModuleManager />);
    expect(baseElement).toBeTruthy();
  });
});
