export interface PaymentDetails {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export function buildPaymentDetails(): PaymentDetails {
  return {
    nameOnCard: 'Test User',
    cardNumber: '4242424242424242',
    cvc: '311',
    expiryMonth: '12',
    expiryYear: '2030',
  };
}
