import type { Page } from '@playwright/test';
import { NavigationComponent } from './navigation.component';
import { FooterComponent } from './footer.component';
import { CategorySidebarComponent } from './category-sidebar.component';
import type { TestComponentsType } from '../types';

export const createComponents = (page: Page): TestComponentsType => ({
  navigation: new NavigationComponent(page),
  footer: new FooterComponent(page),
  categorySidebar: new CategorySidebarComponent(page),
});
