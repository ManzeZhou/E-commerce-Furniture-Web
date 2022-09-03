//
// const PDFDocument = require('pdfkit')
// const blobStream = require('blob-stream')
// import {PaymentInfo} from "../paymenInfo/PaymentInfo";
//
//
//
// const logo = "../../hermin_miller_logo.svg"
// const fileName = './receipt.pdf'
// const baseFont = 'Helvetica'
// const boldFont = 'Helvetica-Bold'
// let current = new Date();
//
// export const createPdf = () => {
//     const addressData = JSON.parse(localStorage.getItem('addressInfo'));
//     const cartItems = JSON.parse(localStorage.getItem('cartArr'));
//
//     let {fullName, email,address, city, province, country, postalCode, phoneNumber} = addressData
//     try {
//         const pdfDoc = new PDFDocument
//         let stream = pdfDoc.pipe(blobStream())
//         pdfDoc.image(logo, 25, 20, {width: 50, height: 50})
//         pdfDoc.font(baseFont).fontSize(14).text('Order Invoice/Receipt', 400, 30, {width: 200})
//         // pdfDoc.fontSize(10).text(current.toLocaleString(), 400, 46, {width: 200})
//
//         pdfDoc.font(boldFont).text('Customer details:', 7, 100);
//         pdfDoc.text(fullName, 7, 115, { width: 250 });
//         pdfDoc.text(address, 7, 130, { width: 250 });
//         pdfDoc.text(city + " " + province + " " + country, 7, 145, { width: 250 });
//         pdfDoc.text(postalCode, 7, 160, { width: 250 });
//
//         pdfDoc.font(boldFont).text('Paid ', 400, 85)
//         pdfDoc.font(boldFont).text('Sold by: ', 400, 100)
//         pdfDoc.text('Hermin Miller', 400, 115, { width: 250 });
//         pdfDoc.text('Order No: 123sST', 400, 130, { width: 250 });
//         pdfDoc.text('Invoice No: 12jir42', 400, 145, { width: 250 });
//         pdfDoc.text('Date: ' + current.toLocaleString(), 400, 160, { width: 250 })
//
//         // table
//         pdfDoc.rect(7, 250, 560, 20).fill("#FC427B").stroke("#FC427B");
//         pdfDoc.text("Product", 110, 256, { width: 190 });
//         pdfDoc.text("Qty", 300, 256, { width: 100 });
//         pdfDoc.text("Price", 400, 256, { width: 100 });
//         pdfDoc.text("Total Price", 500, 256, { width: 100 });
//
//         let productNo = 1;
//         cartItems.id.forEach(element => {
//             console.log("adding", element.name);
//             let y = 256 + (productNo * 20);
//             pdfDoc.text(element.name, 110, y, { width: 190 });
//             pdfDoc.text(element.currentItemQty, 300, y, { width: 100 });
//             pdfDoc.text(parseFloat(element.price + element.selectedPrice), 400, y, { width: 100 });
//             pdfDoc.text(element.totalPrice, 500, y, { width: 100 });
//             productNo++;
//         });
//
//         pdfDoc.rect(7, 256 + (productNo * 20), 560, 0.2).fillColor("#000").stroke("#000");
//         productNo++;
//
//         pdfDoc.font(baseFont).text("Total:", 400, 256 + (productNo * 17));
//         // pdfDoc.font(boldFont).text(, 500, 256 + (productNo * 17));
//
//         pdfDoc.end();
//         console.log("pdf generate successfully");
//     } catch (error) {
//         console.log("Error occurred", error);
//     }
// }
//
