export function buildWhatsAppUrl(
  phoneNumber: string,
  product?: { name: string; price: number; slug: string },
  currencySymbol = '₦'
): string {
  const baseUrl = window.location.origin;
  let message: string;

  if (product) {
    message = `Hi! I'm interested in ${product.name} (${currencySymbol}${product.price.toLocaleString()}).\n${baseUrl}/products/${product.slug}\n\nCould you tell me more?`;
  } else {
    message = `Hi! I'm browsing your products and would love to learn more.`;
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
