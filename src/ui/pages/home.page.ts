import { BasePage } from './base.page';
import { ProductCardComponent } from '../components/product-card.component';

export class HomePage extends BasePage {
  readonly heroHeading = this.page.locator('#slider-carousel .item.active h2').first();
  readonly featuresItemsHeading = this.page.getByRole('heading', { name: 'Features Items' });

  private readonly productGrid = this.page.locator('.features_items');
  private readonly productCards = this.productGrid.locator('.product-image-wrapper');

  async goto() {
    await super.goto('/');
  }

  async checkPage() {
    await super.checkPage(/^https?:\/\/[^/]+\/?$/);
    await this.expectVisible(this.heroHeading);
    await this.expectVisible(this.featuresItemsHeading);
  }

  productCard(index: number): ProductCardComponent {
    return new ProductCardComponent(this.productCards.nth(index));
  }
}
