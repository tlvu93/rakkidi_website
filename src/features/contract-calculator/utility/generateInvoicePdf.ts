import jsPDF from 'jspdf';

import { Order, OrderType } from '@shared/interfaces/contract-calculator';

interface InvoiceData {
  date: string;
  invoiceNumber: string;
  companyName: string;
  address1: string;
  address2: string;
  orders: Order[];
  totalPrice: number;
  calculatePrice: (
    height: number,
    width: number,
    type: OrderType,
    amount: number,
    customPrice?: number
  ) => number;
}

export const generateInvoicePdf = ({
  date,
  invoiceNumber,
  companyName,
  address1,
  address2,
  orders,
  totalPrice,
  calculatePrice
}: InvoiceData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFontSize(24);
  doc.text('INVOICE', 20, 20);

  // Company Info
  doc.setFontSize(12);
  doc.text(companyName, pageWidth - 20, 20, { align: 'right' });
  doc.text(address1, pageWidth - 20, 27, { align: 'right' });
  doc.text(address2, pageWidth - 20, 34, { align: 'right' });

  // Invoice Details
  doc.text(`Date: ${date}`, 20, 40);
  doc.text(`Invoice Number: ${invoiceNumber}`, 20, 47);

  // Table Header
  const startY = 60;
  doc.setFontSize(10);
  doc.text('Amount', 20, startY);
  doc.text('Description', 40, startY);
  doc.text('Dimensions', 100, startY);
  doc.text('Type', 140, startY);
  doc.text('Price', pageWidth - 20, startY, { align: 'right' });

  // Horizontal line
  doc.line(20, startY + 2, pageWidth - 20, startY + 2);

  // Table Content
  let y = startY + 10;
  orders.forEach((order) => {
    const price = calculatePrice(
      order.height,
      order.width,
      order.type,
      order.amount,
      order.customPrice
    );

    // Calculate available width for description
    const descriptionWidth = 55; // Width in mm for description column
    const descriptionLines = doc.splitTextToSize(order.name, descriptionWidth);

    // Calculate row height based on number of lines
    const lineHeight = 7;
    const rowHeight = Math.max(
      lineHeight,
      descriptionLines.length * lineHeight
    );

    // Center text vertically if multiple lines
    const descriptionY =
      y + (rowHeight - descriptionLines.length * lineHeight) / 2;

    // Draw each cell
    doc.text(order.amount.toString(), 20, y + lineHeight / 2);
    doc.text(descriptionLines, 40, descriptionY);
    doc.text(`${order.height}mm × ${order.width}mm`, 100, y + lineHeight / 2);
    doc.text(order.type, 140, y + lineHeight / 2);
    doc.text(`${price.toFixed(2)}€`, pageWidth - 20, y + lineHeight / 2, {
      align: 'right'
    });

    y += rowHeight;
  });

  // Total
  doc.line(20, y + 2, pageWidth - 20, y + 2);
  doc.setFontSize(12);
  doc.text('Total:', 140, y + 10);
  doc.text(`${totalPrice.toFixed(2)}€`, pageWidth - 20, y + 10, {
    align: 'right'
  });

  // Save the PDF
  doc.save(`invoice-${invoiceNumber}.pdf`);
};
