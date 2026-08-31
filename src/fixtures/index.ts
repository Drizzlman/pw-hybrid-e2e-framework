import { test as base, expect } from '@playwright/test';
import { config } from '../config';
import { ApiClient } from '../api/client';
import { buildUser, type TestUser } from '../data';
import { App } from '../ui/app';
import { createPages } from '../ui/utils/create-pages';
import { createComponents } from '../ui/components/create-components';
import { blockAdRequests } from '../utils/ad-block';

type Fixtures = {
  app: App;
  apiClient: ApiClient;
  registeredUser: TestUser;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    await blockAdRequests(page);
    const pages = createPages(page);
    const components = createComponents(page);
    await use(new App(page, pages, components));
  },

  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request, config.apiBaseUrl));
  },

  registeredUser: async ({ apiClient }, use) => {
    const user = buildUser(`worker-${test.info().parallelIndex}`);
    await apiClient.createAccount(user);
    await use(user);
    await apiClient.deleteAccount(user.email, user.password);
  },
});

export { expect };
