import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DiscountResult {
  productName: string;
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
}

@Component({
  selector: 'app-discount-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './discount-calculator.component.html',
  styleUrl: './discount-calculator.component.css',
})
export class DiscountCalculatorComponent {
  productName = '';
  price: number | null = null;
  discountPercentage: number | null = null;

  errorMessage = '';
  result: DiscountResult | null = null;

  calculate(): void {
    const name = this.productName.trim();
    const price = this.price;
    const discount = this.discountPercentage;

    if (!this.isValid(name, price, discount)) {
      this.result = null;
      this.errorMessage = 'Invalid input entered.';
      return;
    }

    const validPrice = price as number;
    const validDiscount = discount as number;

    const discountAmount = (validPrice * validDiscount) / 100;
    const finalPrice = validPrice - discountAmount;

    this.errorMessage = '';
    this.result = {
      productName: name,
      originalPrice: validPrice,
      discountPercentage: validDiscount,
      discountAmount,
      finalPrice,
    };
  }

  private isValid(
    name: string,
    price: number | null,
    discount: number | null
  ): boolean {
    if (name.length === 0) {
      return false;
    }

    if (price === null || isNaN(price) || price <= 0) {
      return false;
    }

    if (discount === null || isNaN(discount) || discount < 0 || discount > 100) {
      return false;
    }

    return true;
  }
}
