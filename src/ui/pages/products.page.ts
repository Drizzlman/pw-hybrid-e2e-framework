import { BasePage } from './base.page';
import { ProductCardComponent } from '../components/product-card.component';

export class ProductsPage extends BasePage {
  readonly sectionHeading = this.page.locator('.features_items h2.title');

  private readonly searchInput = this.page.getByPlaceholder('Search Product');
  private readonly searchButton = this.page.locator('#submit_search');
  private readonly productGrid = this.page.locator('.features_items');
  private readonly productCards = this.productGrid.locator('.product-image-wrapper');

  async goto() {
    await super.goto('/products');
  }

  async checkPage() {
    await super.checkPage(/\/products/);
    await this.expectVisible(this.sectionHeading);
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  productCard(index: number): ProductCardComponent {
    return new ProductCardComponent(this.productCards.nth(index));
  }

  productCardByName(name: string): ProductCardComponent {
    return new ProductCardComponent(this.productCards.filter({ hasText: name }).first());
  }
}
